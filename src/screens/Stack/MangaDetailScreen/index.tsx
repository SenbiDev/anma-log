import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import Gap from "../../../components/atoms/Gap";
import { SolidMaterialIcons } from "../../../components";
import { getManga, storeManga } from "../../../utils/storage";
import { useLightAppTheme } from "../../../themes";
import { RootStackScreenProps } from "../../../navigation/type";
import { onFavoritePressType } from "./type";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectMangaDetail, mangaDetailAsync, setMangaDetailToInitial } from "../../../redux/reducers/mangaDetailSlice";

function MangaDetailScreen({ route }: RootStackScreenProps<'MangaDetailScreen'>) {
    const { mal_id } = route.params
    const lightTheme = useLightAppTheme();
    const mangaDetail = useAppSelector(selectMangaDetail);
    const dispatch = useAppDispatch();
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(true);

    const onFavoritePress = async ({ mal_id, images, title, genreList, published, members, score }: onFavoritePressType) => {
        setIsFavorited(!isFavorited);
        const value = { mal_id, images, title, genreList, published, members, score };
        const data = await getManga();
        console.log('STORAGE', JSON.stringify(data, null, 4));

        if (isFavorited) {
            const valueAfterDelete = data?.filter(({ mal_id }: { mal_id: number }) => mal_id !== value.mal_id);
            storeManga(valueAfterDelete);
        } else {
            storeManga([...data, value]);
        }
    };

    const onTogglePress = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        dispatch(mangaDetailAsync(mal_id));

        async function isMangaFavorited() {
          const getMangaFavoriteList = await getManga();
          const getList = getMangaFavoriteList?.filter((list: { mal_id: number, images: any, title?: string, genres?: string[], aired: any, members?: number, score?: number }) => list.mal_id === mal_id)
          const isExist = getList[0]?.mal_id ? true : false;
          console.log('getMangaFavoriteList: ', JSON.stringify(getMangaFavoriteList, null, 3));
          console.log('getList: ', JSON.stringify(getList, null, 3));
          console.log('is EXIST: ', isExist);
          setIsFavorited(isExist);
        };

        isMangaFavorited();

        return () => {
          dispatch(setMangaDetailToInitial());
        }

    }, [dispatch]);

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container1}>
                <View>
                    <Text style={styles.titleText(lightTheme.textSolidPrimaryColor)} >{mangaDetail?.title}</Text>
                    <Gap height={5} />
                    <Text style={styles.genresText(lightTheme.textSolidPrimaryColor)}>{mangaDetail?.genreList?.join(', ')}</Text>
                    <Gap height={5} />
                    <View style={styles.scoreContainer}>
                        <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
                        <Gap width={6} />
                        <Text style={styles.scoreText(lightTheme.textSolidPrimaryColor)}>
                            {mangaDetail?.score ?? 'Unknown'}
                        </Text>
                    </View>
                </View>
                <SolidMaterialIcons name={isFavorited ? 'favorite' : 'favorite-outline'} color='#FF3D00' sizes={20} boxHeight={24} onPress={() => onFavoritePress({ mal_id, images: mangaDetail?.images, title: mangaDetail?.title, genreList: mangaDetail?.genreList, published: mangaDetail?.published, members: mangaDetail?.members, score: mangaDetail?.score })} />
            </View>
            <Gap height={30} />
            <View style={styles.imageContainer}>
                <Image source={{ uri: mangaDetail?.images?.webp.large_image_url }} style={styles.image} />
            </View>
            <Gap height={30} />
            <View style={styles.container2}>
                <View style={styles.textContainer} >
                    <Text style={styles.rankLabel(lightTheme.textSolidPrimaryColor)}>Rank</Text>
                    <Text style={styles.rankText(lightTheme.textSolidPrimaryColor)}>#{mangaDetail?.rank ?? 'Unknown'}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.popularityLabel(lightTheme.textSolidPrimaryColor)}>Popularity</Text>
                    <Text style={styles.popularityText(lightTheme.textSolidPrimaryColor)}>#{mangaDetail?.popularity ?? 'Unknown'}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.membersLabel(lightTheme.textSolidPrimaryColor)}>Members</Text>
                    <Text style={styles.membersText(lightTheme.textSolidPrimaryColor)}>{mangaDetail?.members ?? 'Unknown'}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.favoritesLabel(lightTheme.textSolidPrimaryColor)}>Favorites</Text>
                    <Text style={styles.favoritesText(lightTheme.textSolidPrimaryColor)}>{mangaDetail?.favorites ?? 'Unknown'}</Text>
                </View>
            </View>
            <Gap height={30} />
            <View style={styles.container2}>
                <View style={styles.textContainer} >
                    <Text style={styles.typeText(lightTheme.textSolidPrimaryColor)}>{`${mangaDetail?.type ?? 'Unknown'}`}</Text>
                </View>
                <Text style={styles.statusText(lightTheme.textSolidPrimaryColor)}>{mangaDetail?.status}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.volumesText(lightTheme.textSolidPrimaryColor)}>{`${mangaDetail?.volumes ?? 'Unknown'} vol,`}</Text>
                    <Text style={styles.chaptersText(lightTheme.textSolidPrimaryColor)}>{`${mangaDetail?.chapters ?? 'Unknown'} chp`}</Text>
                </View>
            </View>
            <Gap height={40} />
            <View style={styles.synopsisContainer}>
                <Text style={styles.synopsisLabel(lightTheme.textSolidPrimaryColor)}>Synopsis</Text>
            </View>
            <Gap height={13} />
            <Text style={styles.synopsisText(lightTheme.textSolidPrimaryColor)} numberOfLines={toggle ? 5 : 0}>{mangaDetail?.synopsis ?? 'Unknown'}</Text>
            <Gap height={10} />
            <View style={styles.arrowIconContainer}>
                <SolidMaterialIcons name={toggle ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} color={lightTheme.iconSolidPrimaryColor} sizes={20} boxHeight={24} onPress={onTogglePress} />
            </View>
            <Gap height={40} />
            <View>
                <Text style={styles.englishLabel(lightTheme.textSolidPrimaryColor)}>English</Text>
                <Text style={styles.englishText(lightTheme.textSolidPrimaryColor)}>{mangaDetail?.title_english ?? 'Unknown'}</Text>
            </View>
            <Gap height={20} />

            <View style={styles.container3}>

                <View>
                    <View>
                        <Text style={styles.publishedLabel(lightTheme.textSolidPrimaryColor)}>Published</Text>
                        <Text style={styles.publishedText(lightTheme.textSolidPrimaryColor)} numberOfLines={3}>{mangaDetail?.published?.string ?? 'Unknown'}</Text>
                    </View>
                    <Gap height={20} />
                    <View>
                        <Text style={styles.serializationLabel(lightTheme.textSolidPrimaryColor)}>Serialization</Text>
                        <Text style={styles.serializationText(lightTheme.textSolidPrimaryColor)} numberOfLines={3}>{mangaDetail?.serializationList?.join(', ') !== '' ? mangaDetail?.serializationList?.join(', ') : 'Unknown'}</Text>
                    </View>
                </View>

                <Gap width={80} />

                <View>
                    <View>
                        <Text style={styles.authorsLabel(lightTheme.textSolidPrimaryColor)}>Authors</Text>
                        <Text style={styles.authorsText(lightTheme.textSolidPrimaryColor)} numberOfLines={4}>{mangaDetail?.authorList?.join(', ') !== '' ? mangaDetail?.authorList?.join(', ') : 'Unknown'}</Text>
                    </View>
                </View>

            </View>
            <Gap height={54} />
        </ScrollView>
    )
}

const styles = StyleSheet.create<any>({
    scroll: {
      padding: 24,
    },
    container1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    titleText: (color: string) => ({
      width: 235,
      fontSize: 16,
      fontFamily: 'poppins-regular',
      color: color
    }),
    genresText: (color: string) => ({
      width: 235,
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color
    }),
    scoreContainer: {
      flex: 1, flexDirection: 'row',
      alignItems: 'center'
    },
    scoreText: (color: string) => ({
      color: color,
      fontSize: 12,
      fontFamily: 'poppins-regular',
      height: 20,
    }),
    imageContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    image: {
      width: 225,
      height: 318,
      borderRadius: 10
    },
    container2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textContainer: {
      alignItems: 'center'
    },
    rankLabel: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color 
    }),
    rankText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color 
    }),
    popularityLabel: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color 
    }),
    popularityText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color 
    }),
    membersLabel: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color 
    }),
    membersText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color 
    }),
    favoritesLabel: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color 
    }),
    favoritesText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color 
    }),
    typeText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color
    }),
    statusText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color
    }),
    volumesText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color
    }),
    chaptersText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color
    }),
    synopsisContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    synopsisLabel: (color: string) => ({
      fontSize: 14,
      fontFamily: 'poppins-medium',
      color: color
    }),
    synopsisText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color
    }),
    arrowIconContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    englishLabel: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color,
    }),
    englishText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color,
    }),
    container3: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    publishedLabel: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color,
    }),
    publishedText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color,
      width: 87
    }),
    serializationLabel: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color,
    }),
    serializationText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color,
      width: 87
    }),
    authorsLabel: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color,
    }),
    authorsText: (color: string) => ({
      fontSize: 12,
      fontFamily: 'poppins-regular',
      color: color,
      width: 127
    }),
  })

export default MangaDetailScreen;