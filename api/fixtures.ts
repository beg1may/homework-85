import config from "./config";
import mongoose from "mongoose";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (e) {
        console.error('Collection were not present, skipping drop');
    }

    const [artistTheWeeknd, artistAdele] = await Artist.create(
        {
            name: "The Weeknd",
            image: "fixtures/The_Weeknd.jpeg",
            information: "The Weeknd (настоящее имя Абель Макконен Тесфайе) — канадский певец, автор песен и продюсер. Известен своими хитовыми песнями, такими как 'Blinding Lights', 'Can't Feel My Face' и 'Starboy'. Он сочетает элементы поп-музыки, R&B и электроники.",
            isPublished: true,
        },
        {
            name: "Adele",
            image: "fixtures/Adele.jpeg",
            information: "Adele (Адель Лори Блу Адкинс) — британская певица и автор песен. Она прославилась благодаря мощным балладам, таким как 'Someone Like You' и 'Hello'. Ее альбомы, такие как '21' и '25', стали мировыми хитами и выиграли множество наград.",
            isPublished: false,
        },
    );

    const [albumAfterHours, albumStarboy, album25, album21] = await Album.create(
        {
            name: 'After Hours',
            artist: artistTheWeeknd._id,
            yearOfManufacture: 2020,
            isPublished: true,
        },
        {
            name: 'Starboy',
            artist: artistTheWeeknd._id,
            yearOfManufacture: 2016,
            isPublished: true,
        },
        {
            name: '25',
            artist: artistAdele._id,
            yearOfManufacture: 2015,
            isPublished: true,
        },
        {
            name: '21',
            artist: artistAdele._id,
            yearOfManufacture: 2011,
            isPublished: false,
        },
    );

    await Track.create(
        {
            name: 'Blinding Lights',
            album: albumAfterHours._id,
            duration: '3:20',
            numberTrack: 1,
            isPublished: true,
        },
        {
            name: 'Save Your Tears',
            album: albumAfterHours._id,
            duration: '3:35',
            numberTrack: 2,
            isPublished: false,
        },
        {
            name: 'Heartless',
            album: albumAfterHours._id,
            duration: '3:18',
            numberTrack: 3,
            isPublished: true,
        },
        {
            name: 'In Your Eyes',
            album: albumAfterHours._id,
            duration: '3:58',
            numberTrack: 4,
            isPublished: true,
        },
        {
            name: 'After Hours',
            album: albumAfterHours._id,
            duration: '6:02',
            numberTrack: 5,
            isPublished: true,
        },

        {
            name: 'Starboy',
            album: albumStarboy._id,
            duration: '3:50',
            numberTrack: 1,
            isPublished: true,
        },
        {
            name: 'I Feel It Coming',
            album: albumStarboy._id,
            duration: '4:29',
            numberTrack: 2,
            isPublished: true,
        },
        {
            name: 'Party Monster',
            album: albumStarboy._id,
            duration: '3:50',
            numberTrack: 3,
            isPublished: true,
        },
        {
            name: 'Reminder',
            album: albumStarboy._id,
            duration: '4:05',
            numberTrack: 4,
            isPublished: true,
        },
        {
            name: 'Secrets',
            album: albumStarboy._id,
            duration: '4:13',
            numberTrack: 5,
            isPublished: true,
        },

        {
            name: 'Hello',
            album: album25._id,
            duration: '3:55',
            numberTrack: 1,
            isPublished: true,
        },
        {
            name: 'Send My Love (To Your New Lover)',
            album: album25._id,
            duration: '3:43',
            numberTrack: 2,
            isPublished: false,
        },
        {
            name: 'When We Were Young',
            album: album25._id,
            duration: '4:45',
            numberTrack: 3,
            isPublished: false,
        },
        {
            name: 'All I Ask',
            album: album25._id,
            duration: '4:30',
            numberTrack: 4,
            isPublished: true,
        },
        {
            name: 'River Lea',
            album: album25._id,
            duration: '4:40',
            numberTrack: 5,
            isPublished: true,
        },


        {
            name: 'Rolling in the Deep',
            album: album21._id,
            duration: '3:48',
            numberTrack: 1,
            isPublished: true,
        },
        {
            name: 'Rumour Has It',
            album: album21._id,
            duration: '3:43',
            numberTrack: 2,
            isPublished: true,
        },
        {
            name: 'Turning Tables',
            album: album21._id,
            duration: '4:11',
            numberTrack: 3,
            isPublished: true,
        },
        {
            name: "Don't You Remember",
            album: album21._id,
            duration: '4:03',
            numberTrack: 4,
            isPublished: true,
        },
        {
            name: 'Set Fire to the Rain',
            album: album21._id,
            duration: '4:02',
            numberTrack: 5,
            isPublished: true,
        },
    );

    const john = new User ({
        username: "John",
        password: "123",
        role: 'user',
    });

    john.generateToken();
    await john.save();


    const jane = new User ({
        username: "Jane",
        password: "123",
        role: 'admin',
    });

    jane.generateToken();
    await jane.save();

    await db.close();
}

run().catch(console.error);