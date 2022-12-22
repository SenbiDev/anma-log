/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect, useCallback } from 'react';
import { ColorSchemeName, Pressable, StyleSheet, View as ViewDefault, StatusBar, Image, ImageBackground as ImgB, ScrollView, Text as TextDefault, TouchableOpacity } from 'react-native';
import ImageBackground from '../components/molecules/ImageBackground/ImageBackground';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootBottomTabParamList, RootTabScreenProps, RootSeasonalTopTabParamList, RootFavoritesTopTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { Text, View } from '../components/Themed';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import BottomTabNavigatorCustom from '../components/molecules/BottomTabNavigator/BottomTabNavigatorCustom';
import Gap from '../components/atoms/Gap/Gap';
import { kage } from '../assets/images';
import { SolidMaterialIcons } from '../components/atoms/Solid';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { List, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import RecommendedAnimeList from '../components/molecules/RecommendedAnimeList';
import Genres from '../components/molecules/Genres';
import Themes from '../components/molecules/Themes';
import Demographics from '../components/molecules/Demographics';
import Accordion from '../components/atoms/Accordion';
import TextInput from '../components/atoms/TextInput';
import AnimeCardList from '../components/molecules/AnimeCardList';
import ArchiveList from '../components/molecules/ArchiveList';
import { GradientText, GradientMaterialIcons } from '../components/atoms/Gradient';
import TopThreeAnime from '../components/molecules/TopThreeAnime';
import TopAnimeList from '../components/molecules/TopAnimeList';
import AnimeList from '../components/molecules/AnimeList';
import TopThreeManga from '../components/molecules/TopThreeManga';
import TopMangaList from '../components/molecules/TopMangaList';
import SearchResult from '../components/molecules/SearchResult';
import { getAnime, getManga, storeAnime, storeManga } from '../utils/storage';


function AnimeScreen({ navigation }: any) {
  return (
    <ScrollView>
      <ViewDefault style={styles.container}>
        {/* <StatusBar backgroundColor="#61dafb" /> */}
        <GradientText style={{ fontSize: 14, marginTop: 24, marginLeft: 24, fontWeight: '600' }} >Recommended Anime</GradientText>
        <Gap height={15} />
        <RecommendedAnimeList type='anime' navigation={navigation} />
        <Gap height={50} />
        <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >Genres</GradientText>
        <Gap height={12} />
        <Genres type='anime' navigation={navigation} />
        <Gap height={15} />
        <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >Themes</GradientText>
        <Gap height={12} />
        <Themes type='anime' navigation={navigation} />
        <Gap height={15} />
        <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >Demographics</GradientText>
        <Gap height={12} />
        <Demographics type='anime' navigation={navigation} />
        <Gap height={50} />

        <View style={{ marginHorizontal: 24, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <GradientText style={{ fontSize: 14, fontWeight: '600' }} >Top Anime</GradientText>
          <TouchableOpacity onPress={() => navigation.navigate('TopAnimeListScreen')}>
            <Text style={{ fontSize: 12 }}>more</Text>
          </TouchableOpacity>
        </View>
        <Gap height={15} />
        <TopThreeAnime navigation={navigation} />
      </ViewDefault>
    </ScrollView>
  )
}

function MangaScreen({ navigation }: any) {
  return (
    <ScrollView>
      <ViewDefault style={styles.container}>
        {/* <StatusBar backgroundColor="#61dafb" /> */}
        <GradientText style={{ fontSize: 14, marginTop: 24, marginLeft: 24, fontWeight: '600' }} >Recommended Manga</GradientText>
        <Gap height={15} />
        <RecommendedAnimeList type='manga' navigation={navigation} />
        <Gap height={50} />
        <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >Genres</GradientText>
        <Gap height={12} />
        <Genres type='manga' navigation={navigation} />
        <Gap height={15} />
        <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >Themes</GradientText>
        <Gap height={12} />
        <Themes type='manga' navigation={navigation} />
        <Gap height={15} />
        <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >Demographics</GradientText>
        <Gap height={12} />
        <Demographics type='manga' navigation={navigation} />
        <Gap height={50} />

        <View style={{ marginHorizontal: 24, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <GradientText style={{ fontSize: 14, fontWeight: '600' }} >Top Manga</GradientText>
          <TouchableOpacity onPress={() => navigation.navigate('TopMangaListScreen')}>
            <Text style={{ fontSize: 12 }}>more</Text>
          </TouchableOpacity>
        </View>
        <Gap height={15} />
        <TopThreeManga navigation={navigation} />
      </ViewDefault>
    </ScrollView>
  )
}

function SearchScreen({ navigation }: any) {
  const [title, setTitle] = React.useState('Anime');
  const [text, setText] = React.useState("");

  const onChangeText = (text: string) => {
    setText(text);
  }

  return (
    <View style={styles.container}>
      <Gap height={24} />
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'transparent', marginHorizontal: 24 }}>
        <Accordion title={title} handleTitlePress={setTitle} />
        <Gap width={7} />
        <TextInput
          title={title}
          text={text}
          onChangeText={onChangeText}
        />
      </View>
      <Gap height={30} />
      {/* <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >Result</GradientText>
      <Gap height={20} /> */}
      <SearchResult types={title.toLowerCase()} letter={text} navigation={navigation} />
    </View>
  )
}

function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text>
        Favorites Screen
      </Text>
      <GradientMaterialIcons size={20} style={{ height: 24 }} name='favorite' />
      <GradientText style={{ fontSize: 10 }} >Favorites</GradientText>
    </View>
  )
}

function AnimeListScreen({ route, navigation }: any) {
  const { type, mal_id } = route.params
  return (
    <ScrollView>
      <AnimeList types={type} id={mal_id} navigation={navigation} />
    </ScrollView>
  )
}

function TopAnimeListScreen({ navigation }: any) {
  return (
    <ScrollView>
      <TopAnimeList navigation={navigation} />
    </ScrollView>
  )
}

function TopMangaListScreen({ navigation }: any) {
  return (
    <ScrollView>
      <TopMangaList navigation={navigation} />
    </ScrollView>
  )
}

function AnimeDetailScreen({ route }: any) {
  const { mal_id } = route.params
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
    <ScrollView style={{ padding: 24 }}>
      <ViewDefault style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <ViewDefault>
          <Text style={{ width: 235, fontSize: 16 }} >{animeDetail?.title}</Text>
          <Gap height={5} />
          <Text style={{ fontSize: 12 }}>{animeDetail?.genreList.join(', ')}</Text>
          <Gap height={5} />
          <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
            <Gap width={6} />
            <TextDefault style={{ color: 'black', fontSize: 12, height: 20 }}>
              {animeDetail?.score ?? 'Unknown'}
            </TextDefault>
          </ViewDefault>
        </ViewDefault>
        <SolidMaterialIcons name={isFavorited ? 'favorite' : 'favorite-outline'} color='#FF3D00' sizes={20} boxHeight={24} onPress={() => onFavoritePress({ mal_id, images: animeDetail?.images, title: animeDetail?.title, genreList: animeDetail?.genreList, aired: animeDetail?.aired, members: animeDetail?.members, score: animeDetail?.score })} />
      </ViewDefault>
      <Gap height={30} />
      <ViewDefault style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Image source={{ uri: animeDetail?.images.webp.large_image_url }} style={{ width: 225, height: 318, borderRadius: 10 }} />
      </ViewDefault>
      <Gap height={30} />
      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ViewDefault style={{ alignItems: 'center' }} >
          <TextDefault style={{ fontSize: 12 }}>Rank</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>#{animeDetail?.rank ?? 'Unknown'}</TextDefault>
        </ViewDefault>

        <ViewDefault style={{ alignItems: 'center' }}>
          <TextDefault style={{ fontSize: 12 }}>Popularity</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>#{animeDetail?.popularity ?? 'Unknown'}</TextDefault>
        </ViewDefault>

        <ViewDefault style={{ alignItems: 'center' }}>
          <TextDefault style={{ fontSize: 12 }}>Members</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>{animeDetail?.members ?? 'Unknown'}</TextDefault>
        </ViewDefault>

        <ViewDefault style={{ alignItems: 'center' }}>
          <TextDefault style={{ fontSize: 12 }}>Favorites</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>{animeDetail?.favorites ?? 'Unknown'}</TextDefault>
        </ViewDefault>
      </ViewDefault>
      <Gap height={30} />
      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ViewDefault style={{ alignItems: 'center' }} >
          <TextDefault style={{ fontSize: 12 }}>{`${animeDetail?.type ?? 'Unknown'},`}</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>{`${animeDetail?.year ?? 'Unknown'}`}</TextDefault>
        </ViewDefault>
        <TextDefault style={{ fontSize: 12 }}>{animeDetail?.status}</TextDefault>
        <ViewDefault style={{ alignItems: 'center' }}>
          <TextDefault style={{ fontSize: 12 }}>{`${animeDetail?.episodes ?? 'Unknown'} ep,`}</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>{`${animeDetail?.duration.replace(' per ep', '')}`}</TextDefault>
        </ViewDefault>
      </ViewDefault>
      <Gap height={40} />
      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextDefault style={{ fontSize: 14, fontWeight: '500' }}>Synopsis</TextDefault>
      </ViewDefault>
      <Gap height={13} />
      <TextDefault style={{ fontSize: 12 }} numberOfLines={toggle ? 5 : 0}>{animeDetail?.synopsis ?? 'Unknown'}</TextDefault>
      <Gap height={10} />
      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <SolidMaterialIcons name={toggle ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} color='black' sizes={20} boxHeight={24} onPress={onTogglePress} />
      </ViewDefault>
      <Gap height={40} />
      <ViewDefault>
        <TextDefault style={{ fontSize: 12 }}>English</TextDefault>
        <TextDefault style={{ fontSize: 12 }}>{animeDetail?.title_english ?? 'Unknown'}</TextDefault>
      </ViewDefault>
      <Gap height={20} />

      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

        <ViewDefault>
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Source</TextDefault>
            <TextDefault style={{ fontSize: 12 }}>{animeDetail?.source ?? 'Unknown'}</TextDefault>
          </ViewDefault>
          <Gap height={20} />
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Studio</TextDefault>
            <TextDefault style={{ fontSize: 12, width: 87 }} numberOfLines={3}>{animeDetail?.studioList.join(', ') !== '' ? animeDetail?.studioList.join(', ') : 'Unknown'}</TextDefault>
          </ViewDefault>
          <Gap height={20} />
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Rating</TextDefault>
            <TextDefault style={{ fontSize: 12, width: 43 }} numberOfLines={4} >{animeDetail?.rating ?? 'Unknown'}</TextDefault>
          </ViewDefault>
        </ViewDefault>
        <Gap width={80} />
        <ViewDefault>
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Season</TextDefault>
            <TextDefault style={{ fontSize: 12 }}>{`${animeDetail?.season?.toUpperCase() ?? 'Unknown'} ${animeDetail?.year ?? 'Unknown'}`}</TextDefault>
          </ViewDefault>
          <Gap height={20} />
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Aired</TextDefault>
            <TextDefault style={{ fontSize: 12, width: 87 }} numberOfLines={3}>{animeDetail?.aired.string ?? 'Unknown'}</TextDefault>
          </ViewDefault>
          <Gap height={20} />
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Licensor</TextDefault>
            <TextDefault style={{ fontSize: 12, width: 127 }} numberOfLines={4}>{animeDetail?.licensorList.join(', ') !== '' ? animeDetail?.licensorList.join(', ') : 'Unknown'}</TextDefault>
          </ViewDefault>
        </ViewDefault>

      </ViewDefault>
      <Gap height={54} />
    </ScrollView>
  )
}

function MangaDetailScreen({ route }: any) {
  const { mal_id } = route.params
  const [mangaDetail, setMangaDetail] = useState<{ title: string, genreList: string[], score: number, images: any, rank: number, popularity: number, members: number, favorites: number, type: string, status: string, volumes: number, chapters: number, synopsis: string, title_english: string, published: any, authorList: string[], serializationList: string[] }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const [toggle, setToggle] = useState(true);

  const onFavoritePress = async ({ mal_id, images, title, genreList, published, members, score }: { mal_id: number, images: any, title?: string, genreList?: string[], published: any, members?: number, score?: number }) => {
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
    async function fetchMangaDetail() {
      try {
        const result = await fetch(`https://api.jikan.moe/v4/manga/${mal_id}/full`);
        const parseResult = await result.json();
        const { title, genres, score, images, rank, popularity, members, favorites, type, status, volumes, chapters, synopsis, title_english, published, authors, serializations } = parseResult?.data;
        const genreList = genres.map(({ name }: { name: string }) => name);
        const authorList = authors.map(({ name }: { name: string }) => name);
        const serializationList = serializations.map(({ name }: { name: string }) => name);

        // console.log('MANGA DETAIL', JSON.stringify(parseResult?.data, null, 4));

        setMangaDetail({ title, genreList, score, images, rank, popularity, members, favorites, type, status, volumes, chapters, synopsis, title_english, published, authorList, serializationList });
        const getMangaFavoriteList = await getManga();
        const getList = getMangaFavoriteList?.filter((list: { mal_id: number, images: any, title?: string, genres?: string[], aired: any, members?: number, score?: number }) => list.mal_id === mal_id)
        const isExist = getList[0]?.mal_id ? true : false;
        console.log('getMangaFavoriteList: ', JSON.stringify(getMangaFavoriteList, null, 3));
        console.log('getList: ', JSON.stringify(getList, null, 3));
        console.log('is EXIST: ', isExist);
        setIsFavorited(isExist);
      } catch {
        alert('Koneksi Jaringan Lambat')
      }
    }

    fetchMangaDetail()
  }, [])

  return (
    <ScrollView style={{ padding: 24 }}>
      <ViewDefault style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <ViewDefault>
          <Text style={{ width: 235, fontSize: 16 }} >{mangaDetail?.title}</Text>
          <Gap height={5} />
          <Text style={{ fontSize: 12, width: 235 }}>{mangaDetail?.genreList.join(', ')}</Text>
          <Gap height={5} />
          <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
            <Gap width={6} />
            <TextDefault style={{ color: 'black', fontSize: 12, height: 20 }}>
              {mangaDetail?.score ?? 'Unknown'}
            </TextDefault>
          </ViewDefault>
        </ViewDefault>
        <SolidMaterialIcons name={isFavorited ? 'favorite' : 'favorite-outline'} color='#FF3D00' sizes={20} boxHeight={24} onPress={() => onFavoritePress({ mal_id, images: mangaDetail?.images, title: mangaDetail?.title, genreList: mangaDetail?.genreList, published: mangaDetail?.published, members: mangaDetail?.members, score: mangaDetail?.score })} />
      </ViewDefault>
      <Gap height={30} />
      <ViewDefault style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Image source={{ uri: mangaDetail?.images.webp.large_image_url }} style={{ width: 225, height: 318, borderRadius: 10 }} />
      </ViewDefault>
      <Gap height={30} />
      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ViewDefault style={{ alignItems: 'center' }} >
          <TextDefault style={{ fontSize: 12 }}>Rank</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>#{mangaDetail?.rank ?? 'Unknown'}</TextDefault>
        </ViewDefault>

        <ViewDefault style={{ alignItems: 'center' }}>
          <TextDefault style={{ fontSize: 12 }}>Popularity</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>#{mangaDetail?.popularity ?? 'Unknown'}</TextDefault>
        </ViewDefault>

        <ViewDefault style={{ alignItems: 'center' }}>
          <TextDefault style={{ fontSize: 12 }}>Members</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>{mangaDetail?.members ?? 'Unknown'}</TextDefault>
        </ViewDefault>

        <ViewDefault style={{ alignItems: 'center' }}>
          <TextDefault style={{ fontSize: 12 }}>Favorites</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>{mangaDetail?.favorites ?? 'Unknown'}</TextDefault>
        </ViewDefault>
      </ViewDefault>
      <Gap height={30} />
      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ViewDefault style={{ alignItems: 'center' }} >
          <TextDefault style={{ fontSize: 12 }}>{`${mangaDetail?.type ?? 'Unknown'}`}</TextDefault>
        </ViewDefault>
        <TextDefault style={{ fontSize: 12 }}>{mangaDetail?.status}</TextDefault>
        <ViewDefault style={{ alignItems: 'center' }}>
          <TextDefault style={{ fontSize: 12 }}>{`${mangaDetail?.volumes ?? 'Unknown'} vol,`}</TextDefault>
          <TextDefault style={{ fontSize: 12 }}>{`${mangaDetail?.chapters ?? 'Unknown'} chp`}</TextDefault>
        </ViewDefault>
      </ViewDefault>
      <Gap height={40} />
      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextDefault style={{ fontSize: 14, fontWeight: '500' }}>Synopsis</TextDefault>
      </ViewDefault>
      <Gap height={13} />
      <TextDefault style={{ fontSize: 12 }} numberOfLines={toggle ? 5 : 0}>{mangaDetail?.synopsis ?? 'Unknown'}</TextDefault>
      <Gap height={10} />
      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <SolidMaterialIcons name={toggle ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} color='black' sizes={20} boxHeight={24} onPress={onTogglePress} />
      </ViewDefault>
      <Gap height={40} />
      <ViewDefault>
        <TextDefault style={{ fontSize: 12 }}>English</TextDefault>
        <TextDefault style={{ fontSize: 12 }}>{mangaDetail?.title_english ?? 'Unknown'}</TextDefault>
      </ViewDefault>
      <Gap height={20} />

      <ViewDefault style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

        <ViewDefault>
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Published</TextDefault>
            <TextDefault style={{ fontSize: 12, width: 87 }} numberOfLines={3}>{mangaDetail?.published.string ?? 'Unknown'}</TextDefault>
          </ViewDefault>
          <Gap height={20} />
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Serialization</TextDefault>
            <TextDefault style={{ fontSize: 12, width: 87 }} numberOfLines={3}>{mangaDetail?.serializationList.join(', ') !== '' ? mangaDetail?.serializationList.join(', ') : 'Unknown'}</TextDefault>
          </ViewDefault>
        </ViewDefault>

        <Gap width={80} />

        <ViewDefault>
          <ViewDefault>
            <TextDefault style={{ fontSize: 12 }}>Authors</TextDefault>
            <TextDefault style={{ fontSize: 12, width: 127 }} numberOfLines={4}>{mangaDetail?.authorList.join(', ') !== '' ? mangaDetail?.authorList.join(', ') : 'Unknown'}</TextDefault>
          </ViewDefault>
        </ViewDefault>

      </ViewDefault>
      <Gap height={54} />
    </ScrollView>
  )
}

function ArchiveListScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1 }} >
      <Gap height={30} />
      <ArchiveList navigation={navigation} />
    </View>
  )
}

function SeasonalListScreen({ route, navigation }: any) {
  const { year, season } = route.params
  const [seasonalList, setSeasonalList] = useState<{ mal_id: number, images: any, title: string, genreList: [], aired: any, members: number, score: number, season: string, year: number }[]>([]);

  useEffect(() => {
    async function fetchNowSeasonal() {
      const result1 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=1`);
      const parseResult1 = await result1.json();
      const nowSeasonalList1 = await parseResult1.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const result2 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=2`);
      const parseResult2 = await result2.json();
      const nowSeasonalList2 = await parseResult2.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const result3 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=3`);
      const parseResult3 = await result3.json();
      const nowSeasonalList3 = await parseResult3.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const nowSeasonalList = [...nowSeasonalList1, ...nowSeasonalList2, ...nowSeasonalList3]
      // console.log('Top Anime List', JSON.stringify(nowSeasonalList, null, 4));
      setSeasonalList(nowSeasonalList);
    }

    fetchNowSeasonal();
  }, []);

  return (
    <View style={{ flex: 1 }} >
      <Gap height={30} />
      <AnimeCardList seasonalList={seasonalList} seasonal={`${season.toUpperCase()} ${year}`} navigation={navigation} />
    </View>
  )
}

function LastSeasonalScreen({ navigation }: any) {
  const [seasonalList, setSeasonalList] = useState<{ mal_id: number, images: any, title: string, genreList: [], aired: any, members: number, score: number, season: string, year: number }[]>([]);
  const [seasonal, setSeasonal] = useState('');

  useEffect(() => {
    async function fetchNowSeasonal() {
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
      const nowSeasonalList1 = await parseResult1.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const result2 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=2`);
      const parseResult2 = await result2.json();
      const nowSeasonalList2 = await parseResult2.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const result3 = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=3`);
      const parseResult3 = await result3.json();
      const nowSeasonalList3 = await parseResult3.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const nowSeasonalList = [...nowSeasonalList1, ...nowSeasonalList2, ...nowSeasonalList3]
      // console.log('Top Anime List', JSON.stringify(nowSeasonalList, null, 4));
      setSeasonal(`${season.toUpperCase()} ${year}`);
      setSeasonalList(nowSeasonalList);
    }

    fetchNowSeasonal();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Gap height={30} />
      <AnimeCardList seasonalList={seasonalList} seasonal={seasonal} navigation={navigation} />
    </View>
  )
}

function NowSeasonalScreen({ navigation }: any) {
  const [seasonalList, setSeasonalList] = useState<{ mal_id: number, images: any, title: string, genreList: [], aired: any, members: number, score: number, season: string, year: number }[]>([]);
  const [seasonal, setSeasonal] = useState('');

  useEffect(() => {
    async function fetchNowSeasonal() {
      const result1 = await fetch('https://api.jikan.moe/v4/seasons/now?page=1');
      const parseResult1 = await result1.json();
      const nowSeasonalList1 = await parseResult1.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const result2 = await fetch('https://api.jikan.moe/v4/seasons/now?page=2');
      const parseResult2 = await result2.json();
      const nowSeasonalList2 = await parseResult2.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const result3 = await fetch('https://api.jikan.moe/v4/seasons/now?page=3');
      const parseResult3 = await result3.json();
      const nowSeasonalList3 = await parseResult3.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const nowSeasonalList = [...nowSeasonalList1, ...nowSeasonalList2, ...nowSeasonalList3]
      // console.log('Top Anime List', JSON.stringify(nowSeasonalList, null, 4));
      setSeasonal(`${nowSeasonalList[0].season.toUpperCase()} ${nowSeasonalList[0].year}`)
      setSeasonalList(nowSeasonalList);
    }

    fetchNowSeasonal();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Gap height={30} />
      <AnimeCardList seasonalList={seasonalList} seasonal={seasonal} navigation={navigation} />
    </View>
  )
}

function UpComingSeasonalScreen({ navigation }: any) {
  const [seasonalList, setSeasonalList] = useState<{ mal_id: number, images: any, title: string, genreList: [], aired: any, members: number, score: number, season: string, year: number }[]>([]);
  const [seasonal, setSeasonal] = useState('');

  useEffect(() => {
    async function fetchUpComingSeasonal() {
      const result1 = await fetch('https://api.jikan.moe/v4/seasons/upcoming?page=1');
      const parseResult1 = await result1.json();
      const upComingSeasonalList1 = await parseResult1.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const result2 = await fetch('https://api.jikan.moe/v4/seasons/upcoming?page=2');
      const parseResult2 = await result2.json();
      const upComingSeasonalList2 = await parseResult2.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const result3 = await fetch('https://api.jikan.moe/v4/seasons/upcoming?page=3');
      const parseResult3 = await result3.json();
      const upComingSeasonalList3 = await parseResult3.data
        .map(({ mal_id, images, title, genres, aired, members, score, season, year }: { mal_id: number, images: any, title: string, genres: [], aired: any, members: number, score: number, season: string, year: number }) => {
          const genreList = genres.map(({ name }: { name: string }) => name);
          return { mal_id, images, title, genreList, aired, members, score, season, year }
        });
      const upComingSeasonalList = [...upComingSeasonalList1, ...upComingSeasonalList2, ...upComingSeasonalList3]
      // console.log('Top Anime List', JSON.stringify(upComingSeasonalList, null, 4));
      setSeasonal(`${upComingSeasonalList[0]?.season?.toUpperCase() ?? 'UP'} ${upComingSeasonalList[0]?.year ?? 'COMING'}`)
      setSeasonalList(upComingSeasonalList);
    }

    fetchUpComingSeasonal();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Gap height={30} />
      <AnimeCardList seasonalList={seasonalList} seasonal={seasonal} navigation={navigation} />
    </View>
  )
}

function AnimeFavoritesListScreen({ navigation }: any) {
  const [animeFavoriteList, setAnimeFavoriteList] = useState<{ mal_id: number, images: any, title: string, genreList: string[], aired: any, members: number, score: number }[]>([]);
  console.log('check inifinite loop')

  useFocusEffect(() => {
    let getAnimeFavoriteList: any = async () => {
      try {
        const getAnimeFavorites = await getAnime();
        setAnimeFavoriteList(getAnimeFavorites)
      } catch {
        alert('Koneksi Jaringan Lambat')
      }
    }
    getAnimeFavoriteList()

    return () => {
      getAnimeFavoriteList = null;
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <Gap height={30} />
      <AnimeCardList seasonalList={animeFavoriteList} seasonal={''} navigation={navigation} />
    </View>
  )
}

function MangaFavoritesListScreen({ navigation }: any) {
  const [animeFavoriteList, setAnimeFavoriteList] = useState<{ mal_id: number, images: any, title: string, genreList: string[], published: any, members: number, score: number }[]>([]);
  console.log('check inifinite loop')

  useFocusEffect(() => {
    let getAnimeFavoriteList: any = async () => {
      try {
        const getAnimeFavorites = await getManga();
        setAnimeFavoriteList(getAnimeFavorites)
      } catch {
        alert('Koneksi Jaringan Lambat')
      }
    }
    getAnimeFavoriteList()

    return () => {
      getAnimeFavoriteList = null;
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <Gap height={30} />
      {/* <AnimeCardList seasonalList={animeFavoriteList} seasonal={''} navigation={navigation} /> */}
    </View>
  )
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AnimeListScreen" component={AnimeListScreen} options={{ headerTitle: 'Anime List', headerTitleAlign: 'center' }} />
      <Stack.Screen name="TopAnimeListScreen" component={TopAnimeListScreen} options={{ headerTitle: 'Top Anime List', headerTitleAlign: 'center' }} />
      <Stack.Screen name="TopMangaListScreen" component={TopMangaListScreen} options={{ headerTitle: 'Top Manga List', headerTitleAlign: 'center' }} />
      <Stack.Screen name="SeasonalListScreen" component={SeasonalListScreen} options={{ headerTitle: 'Seasonal Anime List', headerTitleAlign: 'center' }} />
      <Stack.Screen name="AnimeDetailScreen" component={AnimeDetailScreen} options={{ headerTitle: 'Anime Detail', headerTitleAlign: 'center' }} />
      <Stack.Screen name="MangaDetailScreen" component={MangaDetailScreen} options={{ headerTitle: 'Manga Detail', headerTitleAlign: 'center' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Anime"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
      tabBar={(props: BottomTabBarProps) => <BottomTabNavigatorCustom {...props} />}
    >
      <BottomTab.Screen
        name="Anime"
        component={AnimeScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Manga"
        component={MangaScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Seasonal"
        component={SeasonalTopTabNavigator}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesTopTabNavigator}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
}

function CustomTab({ state, descriptors, navigation }: MaterialTopTabBarProps) {
  return (
    <View style={{ flexDirection: 'row', paddingTop: 15, elevation: 7, shadowOffset: { width: 0, height: 3 }, shadowColor: 'black', shadowOpacity: 1 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: StatusBar.currentHeight || 0 }} >
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ width: '100%' }}>
              {isFocused ? <GradientText style={{ paddingBottom: 12, textAlign: 'center' }} >{(label as string)}</GradientText> :
                <TextDefault style={{ paddingBottom: 12, textAlign: 'center' }} >{(label as string)}</TextDefault>}
              <LinearGradient
                // Background Linear Gradient
                start={{ x: 0.3, y: 0.1 }}
                end={{ x: 1, y: 1 }}
                colors={['rgba(0, 216, 203, 1)', 'rgba(0, 102, 255, 1)']}
                style={isFocused && { height: 2, width: '100%' }}
              />
              <View>
              </View>

            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const SeasonalTopTab = createMaterialTopTabNavigator<RootSeasonalTopTabParamList>();

function SeasonalTopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <SeasonalTopTab.Navigator
      initialRouteName='Now'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          marginTop: StatusBar.currentHeight || 0,
        }
      }}
      tabBar={(props: MaterialTopTabBarProps) => <CustomTab {...props} />}
    >
      <SeasonalTopTab.Screen
        name='Last'
        component={LastSeasonalScreen}
      />
      <SeasonalTopTab.Screen
        name='Now'
        component={NowSeasonalScreen}
      />
      <SeasonalTopTab.Screen
        name='Up Coming'
        component={UpComingSeasonalScreen}
      />
      <SeasonalTopTab.Screen
        name='Archive'
        component={ArchiveListScreen}
      />
    </SeasonalTopTab.Navigator>
  );
}

const FavoritesTopTab = createMaterialTopTabNavigator<RootFavoritesTopTabParamList>();

function FavoritesTopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <FavoritesTopTab.Navigator
      initialRouteName='Anime'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          marginTop: StatusBar.currentHeight || 0,
        }
      }}
      tabBar={(props: MaterialTopTabBarProps) => <CustomTab {...props} />}
    >
      <FavoritesTopTab.Screen
        name='Anime'
        component={AnimeFavoritesListScreen}
      />
      <FavoritesTopTab.Screen
        name='Manga'
        component={MangaFavoritesListScreen}
      />
    </FavoritesTopTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

