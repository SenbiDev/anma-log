import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import TopAnime from '../TopAnime';
import Gap from '../../atoms/Gap/Gap';
import { SolidMaterialIcons } from '../../atoms/Solid';

function AnimeList({ type, id }: { type: 'anime' | 'manga', id: number }) {
    const [animeList, setAnimeList] = useState<{ images: any, title: string, type: string, episodes: number, volumes: number, aired: any, published: any, members: number, score: number }[]>();
    const [text, setText] = useState('1');
    const [limitPage, setLimitPage] = useState(5);
    console.log('check infinite loop')

    useEffect(() => {
        async function fetchTopAnime() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/${type}?genres=${id}&page=${text}`);
                const parseResult = await result.json();
                const animeList = parseResult?.data?.map(({ images, title, type, episodes, volumes, aired, published, members, score }: { images: any, title: string, type: string, episodes: number, volumes: number, aired: any, published: any, members: number, score: number }) => ({ images, title, type, episodes, volumes, aired, published, members, score }));
                const limit = parseResult?.pagination.last_visible_page;
                // console.log('Anime List', JSON.stringify(topAnimeList, null, 4));

                setAnimeList(animeList);
                setLimitPage(limit);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        fetchTopAnime();
    }, [text, limitPage])

    const isFirst = () => {
        return text === '1' ? true : false;
    }

    const isLimited = () => {
        return text === limitPage.toString() ? true : false;
    }

    const onChangeText = (text: string) => {
        const strToNumber = Number(text);
        let numberToStr;
        if (strToNumber > limitPage) {
            setText((limitPage).toString());
        } else if (strToNumber <= 0 || Number.isNaN(strToNumber)) {
            setText('1');
        } else {
            numberToStr = strToNumber.toString();
            setText(numberToStr);
        }
    }

    const onIncrement = () => {
        setText((prevState: string) => {
            const strToNumber = Number(prevState);
            const newValue = strToNumber + 1;
            return newValue.toString();
        });
    }

    const onDecrement = () => {
        setText((prevState: string) => {
            const strToNumber = Number(prevState);
            const newValue = strToNumber - 1;
            return newValue.toString();
        });
    }

    return (
        <View>
            {animeList?.map(({ images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index}>
                    <TopAnime images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} />
                    <Gap height={15} />
                </View>
            ))}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24 }} >
                <SolidMaterialIcons name='keyboard-arrow-left' color={isFirst() ? 'grey' : 'black'} sizes={34} boxHeight={34} onPress={onDecrement} isDisabled={isFirst()} />
                <TextInput mode='outlined' style={{ alignSelf: 'flex-start', height: 28, padding: 0, marginTop: -3, textAlign: 'center', backgroundColor: 'transparent' }} value={text} onChangeText={onChangeText} />
                <SolidMaterialIcons name='keyboard-arrow-right' color={isLimited() ? 'grey' : 'black'} sizes={34} boxHeight={34} onPress={onIncrement} isDisabled={isLimited()} />
            </View>
            <Gap height={25} />
        </View>
    )
}

export default AnimeList