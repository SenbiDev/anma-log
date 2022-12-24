import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import IconAnime from '../Icons/Anime/IconAnime';
import IconAnimeActive from '../Icons/Anime/IconAnimeActive';
import IconManga from '../Icons/Manga/IconManga';
import IconMangaActive from '../Icons/Manga/IconMangaActive';
import IconSearch from '../Icons/Search/IconSearch';
import IconSearchActive from '../Icons/Search/IconSearchActive';
import IconSeasonal from '../Icons/Seasonal/IconSeasonal';
import IconSeasonalActive from '../Icons/Seasonal/IconSeasonalActive';
import IconFavorites from '../Icons/Favorites/IconFavorites';
import IconFavoritesActive from '../Icons/Favorites/IconFavoritesActive';
import GradientText from '../Gradient/GradientText';
import { useLightAppTheme } from '../../../themes';

const TabItem = ({title, active, onPress, onLongPress}: any) => {
  const lightTheme = useLightAppTheme()
  const Icon = () => {
    if (title === 'Anime') {
      return active ? <IconAnimeActive /> : <IconAnime />;
    }
    if (title === 'Manga') {
      return active ? <IconMangaActive /> : <IconManga />;
    }
    if (title === 'Search') {
      return active ? <IconSearchActive /> : <IconSearch />;
    }
    if (title === 'Seasonal') {
      return active ? <IconSeasonalActive /> : <IconSeasonal />;
    }
    if (title === 'Favorites') {
      return active ? <IconFavoritesActive /> : <IconFavorites />;
    }
    return <IconAnime />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      { 
        active
        ? <GradientText style={styles.textGradient} >{title}</GradientText>
        : <Text style={styles.textSolid(lightTheme.textSolidPrimaryColor)} >{title}</Text>
      }
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create<any>({
  container: {alignItems: 'center'},
  textGradient: {
    fontSize: 8,
    paddingVertical: 5,
  },
  textSolid: (color: string) => ({
    fontSize: 8,
    paddingVertical: 5,
    color: color,
  }),
});