import mongoose, {Types} from "mongoose";
import Album from "./Album";

const Schema = mongoose.Schema;

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Название обьязательное поле'],
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const album = await Album.findById(value);
                return !!album;
            },
            message: "Album not found",
        }
    },
    duration: {
        type: String,
        required: [true, 'Продолжительность обьязательное поле'],
    },
    numberTrack: {
        type: Number,
        required: [true, 'Номер трека обьязательное поле'],
        validate: {
            validator: async (value: string) => {
                return !isNaN(+value);
            },
            message: "Number track must be number",
        },
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;