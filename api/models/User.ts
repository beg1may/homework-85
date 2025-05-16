import mongoose, {HydratedDocument, Model} from "mongoose";
import {IUser} from "../types";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateToken(): void;
}

const SALT_WORK_FACTOR = 10;

export const generateTokenJWT = (user: HydratedDocument<IUser>) => {
    return jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: "365d"});
}

export const JWT_SECRET = process.env.JWT_SECRET || 'default_fallback_secret';

type UserModel = Model<IUser, {}, UserMethods>;

const UserSchema = new mongoose.Schema<
    HydratedDocument<IUser>,
    UserModel,
    UserMethods,
    {}
>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(value: string): Promise<boolean> {
                if(!this.isModified('username')) return true;
                const user: HydratedDocument<IUser> | null = await User.findOne({username: value});
                return !user;
            },
            message: "This is username is already taken"
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String,
        required: true,
    },
    avatar: String,
    email: String,
    displayName: {
        type: String,
        required: true,
    },
    googleID: String,

});

UserSchema.methods.checkPassword = function (password: string) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

UserSchema.methods.generateToken = function () {
    this.token = generateTokenJWT(this);
};

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);
export default User;