/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
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
import TopAnime from '../components/molecules/TopAnime';
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


function AnimeScreen({navigation}: any) {
  return (
    <ScrollView>
      <ViewDefault style={styles.container}>
        {/* <StatusBar backgroundColor="#61dafb" /> */}
        <GradientText style={{ fontSize: 14, marginTop: 24, marginLeft: 24, fontWeight: '600' }} >Recommended Anime</GradientText>
        <Gap height={15} />
        <RecommendedAnimeList type='anime' />
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
          <TouchableOpacity  onPress={() => navigation.navigate('TopAnimeListScreen')}>
            <Text style={{ fontSize: 12 }}>more</Text>
          </TouchableOpacity>
        </View>
        <Gap height={15} />
        <TopThreeAnime />
        
        {/* <TopAnime />
        <Gap height={15} />
        <TopAnime />
        <Gap height={15} /> */}
      </ViewDefault>
    </ScrollView>
  )
}

function MangaScreen({navigation}: any) {
  return (
    <ScrollView>
      <ViewDefault style={styles.container}>
        {/* <StatusBar backgroundColor="#61dafb" /> */}
        <GradientText style={{ fontSize: 14, marginTop: 24, marginLeft: 24, fontWeight: '600' }} >Recommended Manga</GradientText>
        <Gap height={15} />
        <RecommendedAnimeList type='manga' />
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
          <TouchableOpacity  onPress={() => navigation.navigate('TopMangaListScreen')}>
            <Text style={{ fontSize: 12 }}>more</Text>
          </TouchableOpacity>
        </View>
        <Gap height={15} />
        <TopThreeManga />

        {/* <TopAnime />
        <Gap height={15} />
        <TopAnime />
        <Gap height={15} />
        <TopAnime />
        <Gap height={15} /> */}
      </ViewDefault>
    </ScrollView>
  )
}

function SearchScreen() {
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
      <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >Result</GradientText>
      <Gap height={20} />
      {/* <TopAnime />
      <Gap height={15} />
      <TopAnime />
      <Gap height={15} />
      <TopAnime />
      <Gap height={15} /> */}
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

function AnimeListScreen({route}: any) {
  const { type, mal_id } = route.params
  return (
    <ScrollView>
      <AnimeList type={type} id={mal_id} />
    </ScrollView>
  )
}

function TopAnimeListScreen() {
  return (
    <ScrollView>
        <TopAnimeList />
    </ScrollView>
  )
}

function TopMangaListScreen() {
  return (
    <ScrollView>
        <TopMangaList />
    </ScrollView>
  )
}

function AnimeDetailScreen() {
  return (
    <>Anime Detail Screen</>
  )
}

function ArchiveListScreen() {
  return (
    <View style={{ flex: 1 }} >
      <Gap height={30} />
      <ArchiveList />
    </View>
  )
}

function SeasonalArchiveScreen() {
  return (
    <>Seasonal Archive Screen</>
  )
}

function LastSeasonalScreen() {
  return (
    <View style={{ flex: 1 }}>
      <GradientText style={{ fontSize: 10 }} >LastSeasonalScreen</GradientText>
    </View>
  )
}

function NowSeasonalScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Gap height={30} />
      <GradientText style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >2022 Fall</GradientText>
      <Gap height={20} />
      <AnimeCardList />
    </View>
  )
}

function UpComingSeasonalScreen() {
  return (
    <View style={{ flex: 1 }}>
      <GradientText style={{ fontSize: 10 }} >UpComingSeasonalScreen</GradientText>
    </View>
  )
}

function AnimeFavoritesListScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Gap height={30} />
      <AnimeCardList />
    </View>
  )
}

function MangaFavoritesListScreen() {
  return (
    <View style={{ flex: 1 }}>
      <GradientText style={{ fontSize: 10 }} >MangaFavoritesListScreen</GradientText>
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

