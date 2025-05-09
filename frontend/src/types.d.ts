export interface Artist {
    _id: string;
    name: string;
    image?: string | null;
    information: string;
    isPublished: boolean;
}

export interface ArtistMutation {
    name: string;
    image: File | null;
    information: string;
}

export interface AlbumByIdArtistInfo {
    _id: string;
    name: string;
    artist: {
        name: string;
        _id: string;
    };
    image?: string | null;
    yearOfManufacture: number;
    isPublished: boolean;
}

export interface AlbumMutation {
    name: string;
    artist: string;
    image: File | null;
    yearOfManufacture: number;
}

export interface TrackByIdAlbum {
    _id: string;
    album: {
        _id: string;
        name: string;
    };
    numberTrack: number;
    name: string;
    duration: string;
    isPublished: boolean;
}

export interface TrackMutation {
    album: string;
    numberTrack: number;
    name: string;
    duration: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface TrackHistory {
    _id: string;
    datetime: string;
    artist: string;
    track: {
        _id: string;
        name: string;
    };
}