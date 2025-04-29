import mongoose, {HydratedDocument, Model} from "mongoose";
import {IUser} from "../types";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<IUser, {}, UserMethods>;

const SALT_WORK_FACTOR = 10;

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
    token: {
        type: String,
        required: true,
    }
});

UserSchema.methods.checkPassword = function (password: string) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
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