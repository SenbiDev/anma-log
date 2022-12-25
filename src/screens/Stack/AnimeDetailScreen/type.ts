export type AnimeDetailScreenStateType = {
    title: string;
    genreList: string[];
    score: number;
    images: any;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    type: string;
    season: string;
    year: number;
    status: string;
    episodes: number;
    duration: string;
    synopsis: string;
    title_english: string;
    source: string;
    studioList: string[];
    aired: any;
    rating: string;
    licensorList: string[];
};

export type onFavoritePressType = {
    mal_id: number;
    images: any;
    title?: string;
    genreList?: string[];
    aired: any;
    members?: number;
    score?: number;
};

