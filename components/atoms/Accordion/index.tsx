import React from 'react'
import { useTheme, List, Button } from 'react-native-paper'
import { Text } from '../../Themed';

const Accordion = ({ title, handleTitlePress }: { title: string, handleTitlePress: (title: string) => void }) => {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState(false);
  
    const handlePress = () => setExpanded(!expanded);
    const handleAnimePress = () => {
      handleTitlePress('Anime');
      handlePress();
    };
  
    const handleMangaPress = () => {
      handleTitlePress('Manga');
      handlePress();
    };
  
    return (
      <List.Accordion
        title={title}
        expanded={expanded}
        onPress={handlePress}
        titleStyle={{ fontSize: 12, width: 39, color: theme.colors.onBackground }}
        style={{ width: 88, height: 40, padding: 0, borderStyle: 'solid', borderWidth: 1, borderRadius: 4, margin: 0, backgroundColor: 'transparent' }}
      >
        <Button
          mode="outlined"
          labelStyle={{ fontSize: 12, width: 39 }}
          style={{ borderWidth: 0, flexDirection: 'row', justifyContent: 'flex-start', padding: 0, margin: 0, borderRadius: 0 }}
          onPress={handleAnimePress}>
          <Text style={{ fontWeight: '400' }}>
            Anime
          </Text>
        </Button>
  
        <Button
          mode="outlined"
          labelStyle={{ fontSize: 12, width: 39 }}
          style={{ borderWidth: 0, flexDirection: 'row', justifyContent: 'flex-start', padding: 0, margin: 0 }}
          onPress={handleMangaPress}>
          <Text style={{ fontWeight: '400' }}>
            Manga
          </Text>
        </Button>
      </List.Accordion>
    );
  };

export default Accordion