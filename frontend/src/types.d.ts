export interface Artist {
    _id: string;
    name: string;
    image?: string | null;
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
}