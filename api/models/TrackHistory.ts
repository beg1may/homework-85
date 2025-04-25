import mongoose, {Types} from "mongoose";
import User from "./User";
import Track from "./Track";

const Schema = mongoose.Schema;

const TrackHistorySchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User is required'],
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "User not found",
        }
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: "Track",
        required: [true, 'Track is required'],
        validate: {
            validator: async (value: Types.ObjectId) => {
                const track = await Track.findById(value);
                return !!track;
            },
            message: "Track not found",
        },
    },
    datetime: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;