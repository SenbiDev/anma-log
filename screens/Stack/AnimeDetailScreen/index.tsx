import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import Gap from "../../../components/atoms/Gap";
import { SolidMaterialIcons } from "../../../components";
import { getAnime, storeAnime } from "../../../utils/storage";
import { useLightAppTheme } from "../../../themes";

function AnimeDetailScreen({ route }: any) {
  const { mal_id } = route.params
  const lightTheme = useLightAppTheme();
  const [animeDetail, setAnimeDetail] = useState<{ title: string, genreList: string[], score: number, images: any, rank: number, popularity: number, members: number, favorites: number, type: string, season: string, year: number, status: string, episodes: number, duration: string, synopsis: string, title_english: string, source: string, studioList: string[], aired: any, rating: string, licensorList: string[] }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const [toggle, setToggle] = useState(true);

  const onFavoritePress = async ({ mal_id, images, title, genreList, aired, members, score }: { mal_id: number, images: any, title?: string, genreList?: string[], aired: any, members?: number, score?: number }) => {
    setIsFavorited(!isFavorited);
    const value = { mal_id, images, title, genreList, aired, members, score };
    const data = await getAnime();
    console.log('STORAGE', JSON.stringify(data, null, 4));
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

  useEffect(() => {
    async function fetchAnimeDetail() {
      try {
        const result = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}/full`);
        const parseResult = await result.json();
        const { title, genres, score, images, rank, popularity, members, favorites, type, season, year, status, episodes, duration, synopsis, title_english, source, studios, aired, rating, licensors } = parseResult?.data;
        const genreList = genres.map(({ name }: { name: string }) => name);
        const studioList = studios.map(({ name }: { name: string }) => name);
        const licensorList = licensors.map(({ name }: { name: string }) => name);

        // console.log('ANIME DETAIL', JSON.stringify(parseResult?.data, null, 4));

        setAnimeDetail({ title, genreList, score, images, rank, popularity, members, favorites, type, season, year, status, episodes, duration, synopsis, title_english, source, studioList, aired, rating, licensorList });
        const getAnimeFavoriteList = await getAnime();
        const getList = getAnimeFavoriteList?.filter((list: { mal_id: number, images: any, title?: string, genres?: string[], aired: any, members?: number, score?: number }) => list.mal_id === mal_id)
        const isExist = getList[0]?.mal_id ? true : false;
        console.log('getAnimeFavoriteList: ', JSON.stringify(getAnimeFavoriteList, null, 3));
        console.log('getList: ', JSON.stringify(getList, null, 3));
        console.log('is EXIST: ', isExist);
        setIsFavorited(isExist);
      } catch {
        alert('Koneksi Jaringan Lambat')
      }
    }

    fetchAnimeDetail()
  }, [])

  return (
    <ScrollView style={styles.scroll}>
      {/* container1, titleText, genresText, scoreContainer, scoreText */}
      <View style={styles.container1}>
        <View>
          <Text style={styles.titleText(lightTheme.textSolidPrimaryColor)}>{animeDetail?.title}</Text>
          <Gap height={5} />
          <Text style={styles.genresText(lightTheme.textSolidPrimaryColor)}>{animeDetail?.genreList.join(', ')}</Text>
          <Gap height={5} />
          <View style={styles.scoreContainer}>
            <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
            <Gap width={6} />
            <Text style={ styles.scoreText(lightTheme.textSolidPrimaryColor)}>
              {animeDetail?.score ?? 'Unknown'}
            </Text>
          </View>
        </View>
        <SolidMaterialIcons name={isFavorited ? 'favorite' : 'favorite-outline'} color='#FF3D00' sizes={20} boxHeight={24} onPress={() => onFavoritePress({ mal_id, images: animeDetail?.images, title: animeDetail?.title, genreList: animeDetail?.genreList, aired: animeDetail?.aired, members: animeDetail?.members, score: animeDetail?.score })} />
      </View>
      <Gap height={30} />
      {/* imageContainer, image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: animeDetail?.images.webp.large_image_url }} style={styles.image} />
      </View>
      <Gap height={30} />
      {/* container2  */}
      <View style={styles.container2}>
        <View style={styles.textContainer} >
          {/* rankLabel */}
          <Text style={styles.rankLabel(lightTheme.textSolidPrimaryColor)}>Rank</Text>
          {/* rankText */}
          <Text style={styles.rankText(lightTheme.textSolidPrimaryColor)}>#{animeDetail?.rank ?? 'Unknown'}</Text>
        </View>

        <View style={styles.textContainer}>
          {/* popularityLabel */}
          <Text style={styles.popularityLabel(lightTheme.textSolidPrimaryColor)}>Popularity</Text>
          {/* popularityText */}
          <Text style={styles.popularityText(lightTheme.textSolidPrimaryColor)}>#{animeDetail?.popularity ?? 'Unknown'}</Text>
        </View>

        <View style={styles.textContainer}>
          {/* membersLabel */}
          <Text style={styles.membersLabel(lightTheme.textSolidPrimaryColor)}>Members</Text>
          {/* membersText */}
          <Text style={styles.membersText(lightTheme.textSolidPrimaryColor)}>{animeDetail?.members ?? 'Unknown'}</Text>
        </View>

        <View style={styles.textContainer}>
          {/* favoritesLabel */}
          <Text style={styles.favoritesLabel(lightTheme.textSolidPrimaryColor)}>Favorites</Text>
          {/* favoritesText */}
          <Text style={styles.favoritesText(lightTheme.textSolidPrimaryColor)}>{animeDetail?.favorites ?? 'Unknown'}</Text>
        </View>
      </View>
      <Gap height={30} />
      {/* container2 */}
      <View style={styles.container2}>
        <View style={styles.textContainer} >
          {/* typeText */}
          <Text style={styles.typeText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail?.type ?? 'Unknown'},`}</Text>
          {/* yearText */}
          <Text style={styles.yearText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail?.year ?? 'Unknown'}`}</Text>
        </View>
          {/* statusText */}
        <Text style={styles.statusText(lightTheme.textSolidPrimaryColor)}>{animeDetail?.status}</Text>
        <View style={styles.textContainer}>
          {/* episodesText */}
          <Text style={styles.episodesText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail?.episodes ?? 'Unknown'} ep,`}</Text>
          {/* durationText */}
          <Text style={styles.durationText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail?.duration.replace(' per ep', '')}`}</Text>
        </View>
      </View>
      <Gap height={40} />
      {/* synopsisContainer */}
      <View style={styles.synopsisContainer}>
        {/* synopsisLabel */}
        <Text style={styles.synopsisLabel(lightTheme.textSolidPrimaryColor)}>Synopsis</Text>
      </View>
      <Gap height={13} />
      {/* synopsisText */}
      <Text style={styles.synopsisText(lightTheme.textSolidPrimaryColor)} numberOfLines={toggle ? 5 : 0}>{animeDetail?.synopsis ?? 'Unknown'}</Text>
      <Gap height={10} />
      {/* arrowIconContainer */}
      <View style={styles.arrowIconContainer}>
        <SolidMaterialIcons name={toggle ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} color={lightTheme.iconSolidPrimaryColor} sizes={20} boxHeight={24} onPress={onTogglePress} />
      </View>
      <Gap height={40} />
      <View>
        {/* englishLabel */}
        <Text style={styles.englishLabel(lightTheme.textSolidPrimaryColor)}>English</Text>
        {/* englishText */}
        <Text style={styles.englishText(lightTheme.textSolidPrimaryColor)}>{animeDetail?.title_english ?? 'Unknown'}</Text>
      </View>
      <Gap height={20} />

      {/* container3 */}
      <View style={styles.container3}>
        <View>
          <View>
            {/* sourceLabel */}
            <Text style={styles.sourceLabel(lightTheme.textSolidPrimaryColor)}>Source</Text>
            {/* sourceText */}
            <Text style={styles.sourceText(lightTheme.textSolidPrimaryColor)}>{animeDetail?.source ?? 'Unknown'}</Text>
          </View>
          <Gap height={20} />
          <View>
            {/* studioLabel */}
            <Text style={styles.studioLabel(lightTheme.textSolidPrimaryColor)}>Studio</Text>
            {/* studioText */}
            <Text style={styles.studioText(lightTheme.textSolidPrimaryColor)} numberOfLines={3}>{animeDetail?.studioList.join(', ') !== '' ? animeDetail?.studioList.join(', ') : 'Unknown'}</Text>
          </View>
          <Gap height={20} />
          <View>
            {/* ratingLabel */}
            <Text style={styles.ratingLabel(lightTheme.textSolidPrimaryColor)}>Rating</Text>
            {/* ratingText */}
            <Text style={styles.ratingText(lightTheme.textSolidPrimaryColor)} numberOfLines={4} >{animeDetail?.rating ?? 'Unknown'}</Text>
          </View>
        </View>
        <Gap width={80} />
        <View>
          <View>
            {/* seasonLabel */}
            <Text style={styles.seasonLabel(lightTheme.textSolidPrimaryColor)}>Season</Text>
            {/* seasonText */}
            <Text style={styles.seasonText(lightTheme.textSolidPrimaryColor)}>{`${animeDetail?.season?.toUpperCase() ?? 'Unknown'} ${animeDetail?.year ?? 'Unknown'}`}</Text>
          </View>
          <Gap height={20} />
          <View>
            {/* airedLabel */}
            <Text style={styles.airedLabel(lightTheme.textSolidPrimaryColor)}>Aired</Text>
            {/* airedText */}
            <Text style={styles.airedText(lightTheme.textSolidPrimaryColor)} numberOfLines={3}>{animeDetail?.aired.string ?? 'Unknown'}</Text>
          </View>
          <Gap height={20} />
          <View>
            {/* licensorLabel */}
            <Text style={styles.licensorLabel(lightTheme.textSolidPrimaryColor)}>Licensor</Text>
            {/* licensorText */}
            <Text style={styles.licensorText(lightTheme.textSolidPrimaryColor)} numberOfLines={4}>{animeDetail?.licensorList.join(', ') !== '' ? animeDetail?.licensorList.join(', ') : 'Unknown'}</Text>
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
    color: color
  }),
  genresText: (color: string) => ({
    fontSize: 12,
    color: color
  }),
  scoreContainer: {
    flex: 1, flexDirection: 'row',
    alignItems: 'center'
  },
  scoreText: (color: string) => ({
    color: color,
    fontSize: 12, height: 20
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
    color: color 
  }),
  rankText: (color: string) => ({
    fontSize: 12,
    color: color 
  }),
  popularityLabel: (color: string) => ({
    fontSize: 12,
    color: color 
  }),
  popularityText: (color: string) => ({
    fontSize: 12,
    color: color 
  }),
  membersLabel: (color: string) => ({
    fontSize: 12,
    color: color 
  }),
  membersText: (color: string) => ({
    fontSize: 12,
    color: color 
  }),
  favoritesLabel: (color: string) => ({
    fontSize: 12,
    color: color 
  }),
  favoritesText: (color: string) => ({
    fontSize: 12,
    color: color 
  }),
  typeText: (color: string) => ({
    fontSize: 12,
    color: color
  }),
  yearText: (color: string) => ({
    fontSize: 12,
    color: color
  }),
  statusText: (color: string) => ({
    fontSize: 12,
    color: color
  }),
  episodesText: (color: string) => ({
    fontSize: 12,
    color: color
  }),
  durationText: (color: string) => ({
    fontSize: 12,
    color: color
  }),
  synopsisContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  synopsisLabel: (color: string) => ({
    fontSize: 14,
    fontWeight: '500',
    color: color
  }),
  synopsisText: (color: string) => ({
    fontSize: 12,
    color: color
  }),
  arrowIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  englishLabel: (color: string) => ({
    fontSize: 12,
    color: color,
  }),
  englishText: (color: string) => ({
    fontSize: 12,
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
    color: color,
  }),
  studioLabel: (color: string) => ({
    fontSize: 12,
    color: color,
  }),
  studioText: (color: string) => ({
    fontSize: 12,
    color: color,
    width: 87
  }),
  ratingLabel: (color: string) => ({
    fontSize: 12,
    color: color,
  }),
  ratingText: (color: string) => ({
    fontSize: 12,
    color: color,
    width: 43 
  }),
  seasonLabel: (color: string) => ({
    fontSize: 12,
    color: color,
  }),
  seasonText: (color: string) => ({
    fontSize: 12,
    color: color,
  }),
  airedLabel: (color: string) => ({
    fontSize: 12,
    color: color,
  }),
  airedText: (color: string) => ({
    fontSize: 12,
    color: color,
    width: 87
  }),
  licensorLabel: (color: string) => ({
    fontSize: 12,
    color: color,
  }),
  licensorText: (color: string) => ({
    fontSize: 12,
    color: color,
    width: 127
  }),
})

export default AnimeDetailScreen;