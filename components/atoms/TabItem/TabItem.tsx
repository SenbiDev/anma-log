import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { IconAnimeActive, IconAnime } from '../Icons/Anime';
import { IconFavoritesActive, IconFavorites } from '../Icons/Favorites';
import { IconMangaActive, IconManga } from '../Icons/Manga';
import { IconSearchActive, IconSearch } from '../Icons/Search';
import { IconSeasonalActive, IconSeasonal } from '../Icons/Seasonal';
import { GradientText } from '../Gradient';
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
        ? <GradientText style={styles.text} >{title}</GradientText>
        : <Text style={[styles.text, { color: lightTheme.textSolidPrimaryColor }]} >{title}</Text>
      }
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  text: {
    fontSize: 8,
    paddingVertical: 5
  },
});