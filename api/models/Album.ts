import mongoose, {Types} from "mongoose";
import Artist from "./Artist";

const Schema = mongoose.Schema;

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Имя обьязательное поле'],
    },
    artist: {
        type: [Schema.Types.ObjectId, 'Artist not found'],
        ref: "Artist",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const artist = await Artist.findById(value);
                return !!artist;
            },
            message: "Artist not found",
        }
    },
    yearOfManufacture: {
        type: Number,
        required: [true, 'Год выпуска обьязательное поле'],
        validate: {
            validator: async (value: string) => {
                return !isNaN(+value);
            },
            message: "Year of manufacture must be number",
        },
    },
    image: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;