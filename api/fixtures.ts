import config from "./config";
import mongoose from "mongoose";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('categories');
        await db.dropCollection('products');
        await db.dropCollection('users');
    } catch (e) {
        console.error('Collection were not present, skipping drop');
    }

    const [artistTheWeeknd, artistAdele, artistBeyonce] = await Artist.create(
        {
            name: "The Weeknd",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/29/The_Weeknd_2015.jpg",
            information: "The Weeknd (настоящее имя Абель Макконен Тесфайе) — канадский певец, автор песен и продюсер. Известен своими хитовыми песнями, такими как 'Blinding Lights', 'Can't Feel My Face' и 'Starboy'. Он сочетает элементы поп-музыки, R&B и электроники."
        },
        {
            name: "Adele",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Adele_2016.jpg",
            information: "Adele (Адель Лори Блу Адкинс) — британская певица и автор песен. Она прославилась благодаря мощным балладам, таким как 'Someone Like You' и 'Hello'. Ее альбомы, такие как '21' и '25', стали мировыми хитами и выиграли множество наград."
        },
    );

    const [albumAfterHours, albumStarboy, album25, album21] = await Album.create(
        {
            name: 'After Hours',
            artist: artistTheWeeknd._id,
            yearOfManufacture: 2020,
            image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/The_Weeknd_-_After_Hours.png'
        },
        {
            name: 'Starboy',
            artist: artistTheWeeknd._id,
            yearOfManufacture: 2016,
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/The_Weeknd_-_Starboy.png'
        },
        {
            name: '25',
            artist: artistAdele._id,
            yearOfManufacture: 2015,
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Adele_25.png'
        },
        {
            name: '21',
            artist: artistAdele._id,
            yearOfManufacture: 2011,
            image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Adele_21.png'
        },
    );

    await Track.create(
        {
            name: 'Blinding Lights',
            album: albumAfterHours,
            duration: '3:20',
            numberTrack: 1,
        },
        {
            name: 'Save Your Tears',
            album: albumAfterHours,
            duration: '3:35',
            numberTrack: 2,
        },
        {
            name: 'Heartless',
            album: albumAfterHours,
            duration: '3:18',
            numberTrack: 3,
        },
        {
            name: 'In Your Eyes',
            album: albumAfterHours,
            duration: '3:58',
            numberTrack: 4,
        },
        {
            name: 'After Hours',
            album: albumAfterHours,
            duration: '6:02',
            numberTrack: 5,
        },

        {
            name: 'Starboy',
            album: albumStarboy,
            duration: '3:50',
            numberTrack: 1,
        },
        {
            name: 'I Feel It Coming',
            album: albumStarboy,
            duration: '4:29',
            numberTrack: 2,
        },
        {
            name: 'Party Monster',
            album: albumStarboy,
            duration: '3:50',
            numberTrack: 3,
        },
        {
            name: 'Reminder',
            album: albumStarboy,
            duration: '4:05',
            numberTrack: 4,
        },
        {
            name: 'Secrets',
            album: albumStarboy,
            duration: '4:13',
            numberTrack: 5,
        },

        {
            name: 'Hello',
            album: album25,
            duration: '3:55',
            numberTrack: 1,
        },
        {
            name: 'Send My Love (To Your New Lover)',
            album: album25,
            duration: '3:43',
            numberTrack: 2,
        },
        {
            name: 'When We Were Young',
            album: album25,
            duration: '4:45',
            numberTrack: 3,
        },
        {
            name: 'All I Ask',
            album: album25,
            duration: '4:30',
            numberTrack: 4,
        },
        {
            name: 'River Lea',
            album: album25,
            duration: '4:40',
            numberTrack: 5,
        },


        {
            name: 'Rolling in the Deep',
            album: album21,
            duration: '3:48',
            numberTrack: 1,
        },
        {
            name: 'Rumour Has It',
            album: album21,
            duration: '3:43',
            numberTrack: 2,
        },
        {
            name: 'Turning Tables',
            album: album21,
            duration: '4:11',
            numberTrack: 3,
        },
        {
            name: "Don't You Remember",
            album: album21,
            duration: '4:03',
            numberTrack: 4,
        },
        {
            name: 'Set Fire to the Rain',
            album: album21,
            duration: '4:02',
            numberTrack: 5,
        },
    )

    await db.close();
}

run().catch(console.error);