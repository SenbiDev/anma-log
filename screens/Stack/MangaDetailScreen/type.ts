export type MangaDetailScreenStateType = {
    title: string;
    genreList: string[];
    score: number;
    images: any;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    type: string;
    status: string;
    volumes: number;
    chapters: number;
    synopsis: string;
    title_english: string;
    published: any;
    authorList: string[];
    serializationList: string[];
};

export type onFavoritePressType = {
    mal_id: number;
    images: any;
    title?: string;
    genreList?: string[];
    published: any;
    members?: number;
    score?: number;
};