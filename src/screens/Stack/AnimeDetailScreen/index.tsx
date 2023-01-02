import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, View, Text, Image, StyleSheet } from 'react-native';
import Gap from "../../../components/atoms/Gap";
import { SolidMaterialIcons } from "../../../components";
import { getAnime, storeAnime } from "../../../utils/storage";
import { useLightAppTheme } from "../../../themes";
import { RootStackScreenProps } from "../../../navigation/type";
import { onFavoritePressType } from "./type";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectAnimeDetail, animeDetailAsync, setAnimeDetailToInitial } from "../../../redux/reducers/animeDetailSlice";

function AnimeDetailScreen({ route }: RootStackScreenProps<'AnimeDetailScreen'>) {
  const { mal_id } = route.params
  const lightTheme = useLightAppTheme();
  const animeDetail = useAppSelector(selectAnimeDetail);
  const dispatch = useAppDispatch();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(true);
  const US = Intl.NumberFormat("en-US", {
    currency: "USD",
  });

  useEffect(() => {
    dispatch(animeDetailAsync(mal_id));

    async function isAnimeFavorited() {
      const getAnimeFavoriteList = await getAnime();
      const getList = getAnimeFavoriteList?.filter((list: { mal_id: number, images: any, title?: string, genres?: string[], aired: any, members?: number, score?: number }) => list.mal_id === mal_id)
      const isExist = getList[0]?.mal_id ? true : false;

      setIsFavorited(isExist);
    };

    isAnimeFavorited();

    return () => {
      dispatch(setAnimeDetailToInitial());
    }
  }, [dispatch]);

  const onFavoritePress = async ({ mal_id, images, title, genreList, aired, members, score }: onFavoritePressType) => {
    setIsFavorited(!isFavorited);

    const value = { mal_id, images, title, genreList, aired, members, score };
    const data = await getAnime();

    if (isFavorited) {
      const valueAfterDelete = data?.filter(({ mal_id }: { mal_id: number }) => mal_id !== value.mal_id);
      storeAnime(valueAfterDelete);
    } else {
      storeAnime([...data, value]);
    }
  };

  const onTogglePress = () => {
    setToggle(!toggle);
  };

  function isLoading() {
    return animeDetail.status === 'loading';
  }

  function wait() {
    setTimeout(() => dispatch(animeDetailAsync(mal_id)), 500);
  }

  const onRefresh = React.useCallback(() => {
    wait();
  }, []);

  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={
        <RefreshControl
          progressViewOffset={-20}
          refreshing={isLoading()}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container1}>
        <View>
          <Text style={styles.titleText(lightTheme.textSolidPrimaryColor)}>{animeDetail.value?.title}</Text>
          <Gap height={5} />
          <Text style={styles.genresText(lightTheme.textSolidPrimaryColor)}>{animeDetail.value?.genreList?.join(', ')}</Text>
          <Gap height={5} />
          <View style={styles.scoreContainer}>
            <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
            <Gap width={6} />
            <Text style={styles.scoreText(lightTheme.textSolidPrimaryColor)}>
              {animeDetail.value?.score ?? 'Unknown'}
            </Text>
          </View>
        </View>
        <SolidMaterialIcons name={isFavorited ? 'favorite' : 'favorite-outline'} color='#FF3D00' sizes={20} boxHeight={24} onPress={() => onFavoritePress({ mal_id, images: animeDetail.value?.images, title: animeDetail.value?.title, genreList: animeDetail.value?.genreList, aired: animeDetail.value?.aired, members: animeDetail.value?.members, score: animeDetail.value?.score })} />
      </View>
      <Gap height={30} />
      <View style={styles.imageContainer}>
        <Image source={{ uri: animeDetail.value?.images?.webp.large_image_url }} style={styles.image} />
      </View>
      <Gap height={30} />
      <View style={styles.container2}>
        <View style={styles.textContainer} >
          <Text style={styles.rankLabel(lightTheme.textSolidPrimaryColor)}>Rank</Text>
          <Text style={styles.rankText(lightTheme.textSolidPrimaryColor)}>#{animeDetail.value?.rank ?? 'Unknown'}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.popularityLabel(lightTheme.textSolidPrimaryColor)}>Popularity</Text>
          <Text style={styles.popularityText(lightTheme.textSolidPrimaryColor)}>#{animeDetail.value?.popularity ?? 'Unknown'}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.membersLabel(lightTheme.textSolidPrimaryColor)}>Members</Text>
          <Text style={styles.membersText(lightTheme.textSolidPrimaryColor)}>{US.format(animeDetail.value?.members!!) ?? 'Unknown'}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.favoritesLabel(lightTheme.textSolidPrimaryColor)}>Favorites</Text>
          <Text style={styles.favoritesText(lightTheme.textSolidPrimaryColor)}>{US.format(animeDetail.value?.favorites!!) ?? 'Unknown'}</Text>
        </View>
      </View>
      <Gap height={30} />
      <View style={styles.container2}>
        <View style={styles.textContainer} >
          <Text style={styles.typeText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail.value?.type ?? 'Unknown'},`}</Text>
          <Text style={styles.yearText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail.value?.year ?? 'Unknown'}`}</Text>
        </View>
        <Text style={styles.statusText(lightTheme.textSolidPrimaryColor)}>{animeDetail.value?.status}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.episodesText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail.value?.episodes ?? 'Unknown'} ep,`}</Text>
          <Text style={styles.durationText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail.value?.duration?.replace(' per ep', '')}`}</Text>
        </View>
      </View>
      <Gap height={40} />
      <View style={styles.synopsisContainer}>
        <Text style={styles.synopsisLabel(lightTheme.textSolidPrimaryColor)}>Synopsis</Text>
      </View>
      <Gap height={13} />
      <Text style={styles.synopsisText(lightTheme.textSolidPrimaryColor)} numberOfLines={toggle ? 5 : 0}>{animeDetail.value?.synopsis ?? 'Unknown'}</Text>
      <Gap height={10} />
      <View style={styles.arrowIconContainer}>
        <SolidMaterialIcons name={toggle ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} color={lightTheme.iconSolidPrimaryColor} sizes={20} boxHeight={24} onPress={onTogglePress} />
      </View>
      <Gap height={40} />
      <View>
        <Text style={styles.englishLabel(lightTheme.textSolidPrimaryColor)}>English</Text>
        <Text style={styles.englishText(lightTheme.textSolidPrimaryColor)}>{animeDetail.value?.title_english ?? 'Unknown'}</Text>
      </View>
      <Gap height={20} />
      <View style={styles.container3}>
        <View>
          <View>
            <Text style={styles.sourceLabel(lightTheme.textSolidPrimaryColor)}>Source</Text>
            <Text style={styles.sourceText(lightTheme.textSolidPrimaryColor)}>{animeDetail.value?.source ?? 'Unknown'}</Text>
          </View>
          <Gap height={20} />
          <View>
            <Text style={styles.studioLabel(lightTheme.textSolidPrimaryColor)}>Studio</Text>
            <Text style={styles.studioText(lightTheme.textSolidPrimaryColor)} numberOfLines={3}>{animeDetail.value?.studioList?.join(', ') !== '' ? animeDetail.value?.studioList?.join(', ') : 'Unknown'}</Text>
          </View>
          <Gap height={20} />
          <View>
            <Text style={styles.ratingLabel(lightTheme.textSolidPrimaryColor)}>Rating</Text>
            <Text style={styles.ratingText(lightTheme.textSolidPrimaryColor)} numberOfLines={4} >{animeDetail.value?.rating ?? 'Unknown'}</Text>
          </View>
        </View>
        <Gap width={80} />
        <View>
          <View>
            <Text style={styles.seasonLabel(lightTheme.textSolidPrimaryColor)}>Season</Text>
            <Text style={styles.seasonText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail.value?.season?.toUpperCase() ?? 'Unknown'} ${animeDetail.value?.year ?? 'Unknown'}`}</Text>
          </View>
          <Gap height={20} />
          <View>
            <Text style={styles.airedLabel(lightTheme.textSolidPrimaryColor)}>Aired</Text>
            <Text style={styles.airedText(lightTheme.textSolidPrimaryColor)} numberOfLines={3}>{animeDetail.value?.aired?.string ?? 'Unknown'}</Text>
          </View>
          <Gap height={20} />
          <View>
            <Text style={styles.licensorLabel(lightTheme.textSolidPrimaryColor)}>Licensor</Text>
            <Text style={styles.licensorText(lightTheme.textSolidPrimaryColor)} numberOfLines={4}>{animeDetail.value?.licensorList?.join(', ') !== '' ? animeDetail.value?.licensorList?.join(', ') : 'Unknown'}</Text>
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
    height: 20,
    fontFamily: 'poppins-regular',
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
  yearText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color
  }),
  statusText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color
  }),
  episodesText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color
  }),
  durationText: (color: string) => ({
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
  sourceLabel: (color: string) => ({
    fontSize: 12,
    color: color,
  }),
  sourceText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
  }),
  studioLabel: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
  }),
  studioText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
    width: 87
  }),
  ratingLabel: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
  }),
  ratingText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
    width: 53
  }),
  seasonLabel: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
  }),
  seasonText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
  }),
  airedLabel: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
  }),
  airedText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
    width: 87
  }),
  licensorLabel: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
  }),
  licensorText: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
    width: 127
  }),
})

export default AnimeDetailScreen;