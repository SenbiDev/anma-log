import { SearchResultType } from "../components/molecules/SearchResult/type";
import { AnimeDetailScreenStateType } from "../screens/Stack/AnimeDetailScreen/type";
import { MangaDetailScreenStateType } from "../screens/Stack/MangaDetailScreen/type";
import { getAnime, getManga } from "./storage";

export async function fetchRecommendedList(type: 'anime' | 'manga') {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/recommendations/${type}`);
        const parseResult = await result.json();
        const obj = [...parseResult.data.map((data: any) => data)]
        const entry = [...obj.map(({ entry }: any) => entry)]
        const matriks1 = entry.map((matrik: any) => matrik[0])
        const matriks2 = entry.map((matrik: any) => matrik[1])
        const titleAndImageList = [...matriks1.map(({ mal_id, title, images }: any) => ({ mal_id, title, images })), ...matriks2.map(({ mal_id, title, images }: any) => ({ mal_id, title, images }))];
        const top10RecommendedList = []

        for (let i = 0; i < 10; i++) {
            top10RecommendedList.push(titleAndImageList[i])
        }

        return top10RecommendedList;
    } catch {
        alert('Failed to load recommendation list')
    }
}

export async function fetchGenreList(type: 'anime' | 'manga') {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/genres/${type}?filter=genres`);
        const parseResult = await result.json();
        const filterResult = parseResult?.data.filter((result: any) => result.name !== 'Boys Love' && result.name !== 'Girls Love');
        const list = filterResult.map(({ name, mal_id }: { name: string, mal_id: number }) => ({ name, mal_id }));

        return list;
    } catch {
        alert('Failed to load genre list')
    }
}

export async function fetchThemeList(type: 'anime' | 'manga') {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/genres/${type}?filter=themes`);
        const parseResult = await result.json();
        const filterResult = parseResult?.data
            .filter((result: any) =>
                result.name !== 'Childcare' && result.name !== 'Combat sports' &&
                result.name !== 'Crossdressing' && result.name !== 'Delinquents' &&
                result.name !== 'Idols (Female)' && result.name !== 'Idols (Male)' &&
                result.name !== 'Love Polygon' && result.name !== 'Magical Sex Shift' &&
                result.name !== 'Mahou Shoujo' && result.name !== 'Performing Arts' &&
                result.name !== 'Pets' && result.name !== 'Reverse Harem' && result.name !== 'Showbiz'
            );

        let first = -2;
        let second = -1;

        const mapResult = filterResult.map(({ name, mal_id }: { name: string, mal_id: number }) => ({ name, mal_id }));
        const list = mapResult.map(() => ([mapResult[first += 2], mapResult[second += 2]]));
        const listWithoutUndefined = list.filter((matrix: [{ name: string; mal_id: number; }, { name: string; mal_id: number; }]) => matrix[0] !== undefined && matrix[1] !== undefined);

        return listWithoutUndefined;
    } catch {
        alert('Failed to load theme list')
    }
}

export async function fetchDemographicList(type: 'anime' | 'manga') {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/genres/${type}?filter=demographics`);
        const parseResult = await result.json();
        const list = parseResult?.data.map(({ name, mal_id }: { name: string, mal_id: number }) => ({ name, mal_id }));

        return list;
    } catch {
        alert('Failed to load demographic list')
    }
}

export async function fetchList({ types, id, text }: { types: 'anime' | 'manga', id: number, text: string }) {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/${types}?genres=${id}&page=${text}`);
        const parseResult = await result.json();
        const list = parseResult?.data?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }: { mal_id: number, images: any, title: string, type: string, episodes: number, volumes: number, aired: any, published: any, members: number, score: number }) => ({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }));
        const limit = parseResult?.pagination.last_visible_page;

        return { list, limit }
    } catch {
        alert('Failed to load list')
    }
}

export async function fetchTopList(types: 'anime' | 'manga') {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/top/${types}?type=tv`);
        const parseResult = await result.json();
        const list = parseResult?.data?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }: { mal_id: number, images: any, title: string, type: string, episodes?: number, volumes?: number, aired?: any, published?: any, members: number, score: number }) => ({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }));

        return list;
    } catch {
        alert('Failed to load top list')
    }
}

export async function fetchTopThreeList(types: 'anime' | 'manga') {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/top/${types}?type=tv`);
        const parseResult = await result.json();
        const list = parseResult?.data?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }: { mal_id: number, images: any, title: string, type: string, episodes?: number, volumes?: number, aired?: any, published?: any, members: number, score: number }) => ({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }));
        const topThree = [list[0], list[1], list[2]]

        return topThree;
    } catch {
        alert('Failed to load top 3 list')
    }
}

export async function fetchSearchList({ types, letter }: Omit<SearchResultType, 'navigation'>) {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/${types}?letter=${letter}`);
        const parseResult = await result.json();
        const list = parseResult?.data?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }: { mal_id: number, images: any, title: string, type: string, episodes: number, volumes: number, aired: any, published: any, members: number, score: number }) => ({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }));

        return list;
    } catch {
        alert('Failed to load search list')
    }
}

export async function fetchAnimeDetail(mal_id: number) {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}/full`);
        const parseResult = await result.json();
        const { title, genres, score, images, rank, popularity, members, favorites, type, season, year, status, episodes, duration, synopsis, title_english, source, studios, aired, rating, licensors } = parseResult?.data;
        const genreList = genres.map(({ name }: { name: string }) => name);
        const studioList = studios.map(({ name }: { name: string }) => name);
        const licensorList = licensors.map(({ name }: { name: string }) => name);
        const animeDetail: AnimeDetailScreenStateType = { title, genreList, score, images, rank, popularity, members, favorites, type, season, year, status, episodes, duration, synopsis, title_english, source, studioList, aired, rating, licensorList };

        return animeDetail;
    } catch {
        alert('Failed to load anime detail')
    }
}

export async function fetchMangaDetail(mal_id: number) {
    try {
        const result = await fetch(`https://api.jikan.moe/v4/manga/${mal_id}/full`);
        const parseResult = await result.json();
        const { title, genres, score, images, rank, popularity, members, favorites, type, status, volumes, chapters, synopsis, title_english, published, authors, serializations } = parseResult?.data;
        const genreList = genres.map(({ name }: { name: string }) => name);
        const authorList = authors.map(({ name }: { name: string }) => name);
        const serializationList = serializations.map(({ name }: { name: string }) => name);
        const mangaDetail: MangaDetailScreenStateType = { title, genreList, score, images, rank, popularity, members, favorites, type, status, volumes, chapters, synopsis, title_english, published, authorList, serializationList };

        return mangaDetail;
    } catch {
        alert('Failed to load manga detail')
    }
}

export async function fetchSeasonalList({ year, season }: { year: number, season: "fall" | "winter" | "spring" | "summer" | undefined }) {
    try {
        const result1 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=1`);
        const parseResult1 = await result1.json();
        const list1 = await parseResult1.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const result2 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=2`);
        const parseResult2 = await result2.json();
        const list2 = await parseResult2.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const result3 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=3`);
        const parseResult3 = await result3.json();
        const list3 = await parseResult3.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const list = [...list1, ...list2, ...list3]

        return list;
    } catch {
        alert('Failed to load seasonal list')
    }
}

export async function fetchArchiveList() {
    try {
        const result = await fetch('https://api.jikan.moe/v4/seasons');
        const parseResult = await result.json();
        const filterResult = parseResult.data.filter(({ year }: { year: number }) => year >= 1999);

        return filterResult;
    } catch {
        alert('Failed to load archive list')
    }
}

export async function fetchLastSeasonalList() {
    try {
        const result = await fetch('https://api.jikan.moe/v4/seasons/now?page=1');
        const parseResult = await result.json();
        const nowSeasonal = await parseResult.data.map(({ season, year }: { season: string, year: number }) => ({ season, year }));
        const getLastSeason: { [index: string]: string } = {
            winter: 'fall',
            spring: 'winter',
            summer: 'spring',
            fall: 'summer',
        }
        const season = getLastSeason[nowSeasonal[0].season]
        const year = (getLastSeason[nowSeasonal[0].season] === 'fall') ? nowSeasonal[0].year - 1 : nowSeasonal[0].year;

        const result1 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=1`);
        const parseResult1 = await result1.json();
        const list1 = await parseResult1.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const result2 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=2`);
        const parseResult2 = await result2.json();
        const list2 = await parseResult2.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const result3 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=3`);
        const parseResult3 = await result3.json();
        const list3 = await parseResult3.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const list = [...list1, ...list2, ...list3]

        return { value: list, seasonalName: `${season.toUpperCase()} ${year}` }
    } catch {
        alert('Failed to load last seasonal list')
    }
}

export async function fetchNowSeasonalList() {
    try {
        const result1 = await fetch('https://api.jikan.moe/v4/seasons/now?page=1');
        const parseResult1 = await result1.json();
        const list1 = await parseResult1.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const result2 = await fetch('https://api.jikan.moe/v4/seasons/now?page=2');
        const parseResult2 = await result2.json();
        const list2 = await parseResult2.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const result3 = await fetch('https://api.jikan.moe/v4/seasons/now?page=3');
        const parseResult3 = await result3.json();
        const list3 = await parseResult3.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const list = [...list1, ...list2, ...list3]

        return { value: list, seasonalName: `${list[0].season.toUpperCase()} ${list[0].year}` }
    } catch {
        alert('Failed to load now seasonal list')
    }
}

export async function fetchUpComingSeasonalList() {
    try {
        const result1 = await fetch('https://api.jikan.moe/v4/seasons/upcoming?page=1');
        const parseResult1 = await result1.json();
        const list1 = await parseResult1.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const result2 = await fetch('https://api.jikan.moe/v4/seasons/upcoming?page=2');
        const parseResult2 = await result2.json();
        const list2 = await parseResult2.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const result3 = await fetch('https://api.jikan.moe/v4/seasons/upcoming?page=3');
        const parseResult3 = await result3.json();
        const list3 = await parseResult3.data
            .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
                const genreList = genres.map(({ name }: { name: string }) => name);
                return { mal_id, images, title, genreList, aired, members, score, season, year }
            });
        const list = [...list1, ...list2, ...list3]

        return { value: list, seasonalName: `${list[0]?.season?.toUpperCase() ?? 'UP'} ${list[0]?.year ?? 'COMING'}` }
    } catch {
        alert('Failed to load up coming seasonal list')
    }
}

export async function fetchAnimeFavoriteList() {
    try {
        const getAnimeFavorites = await getAnime();
        return getAnimeFavorites;
    } catch {
        alert('Failed to load anime favorite list')
    }
}

export async function fetchMangaFavoriteList() {
    try {
        const getMangaFavorites = await getManga();
        return getMangaFavorites;
    } catch {
        alert('Failed to load manga favorite list')
    }
}