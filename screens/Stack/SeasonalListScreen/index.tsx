import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Gap from "../../../components/atoms/Gap";
import { SeasonalOrFavoriteOfList } from "../../../components";

function SeasonalListScreen({ route, navigation }: any) {
    const { year, season } = route.params
    const [seasonalList, setSeasonalList] = useState<{ mal_id: number, images: any, title: string, genreList: [], aired: any, members: number, score: number, season: string, year: number }[]>([]);

    useEffect(() => {
        async function fetchSeasonal() {
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
            // console.log('Top Anime List', JSON.stringify(seasonalList, null, 4));
            setSeasonalList(list);
        }

        fetchSeasonal();
    }, []);

    return (
        <View style={{ flex: 1 }} >
            <Gap height={30} />
            <SeasonalOrFavoriteOfList type='anime' list={seasonalList} label={`${season.toUpperCase()} ${year}`} navigation={navigation} />
        </View>
    )
}

export default SeasonalListScreen;