export interface Artist {
    _id: string;
    name: string;
    image?: string | null;
    information: string;
}

export interface AlbumByIdArtistInfo {
    _id: string;
    name: string;
    artist: string;
    image?: string | null;
    yearOfManufacture: number;
}

export interface TrackByIdAlbum {
    _id: string;
    numberTrack: number;
    name: string;
    duration: string;
}