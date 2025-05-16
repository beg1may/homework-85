export interface IAlbums {
    id: string;
    name: string;
    artist: string;
    yearOfManufacture: number;
    image: string | null;
}

export type IAlbumWithoutId = Omit<IAlbums, "id">;

export interface IUser {
    username: string;
    password: string;
    token: string;
    role: string;
    avatar: string;
    email: string;
    displayName: string,
    googleID: string,
}