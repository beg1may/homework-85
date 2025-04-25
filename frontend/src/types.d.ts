export interface Artist {
    _id: string;
    name: string;
    image?: string | null;
    information: string;
}

export interface AlbumByIdArtistInfo {
    _id: string;
    name: string;
    image?: string | null;
    yearOfManufacture: number;
}