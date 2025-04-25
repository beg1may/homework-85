import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Название обьязательное поле'],
    },
    image: String,
    information: {
        type: String,
        required: [true, 'Информация обьязательное поле'],
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;