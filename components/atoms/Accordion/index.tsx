import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { List, Button } from 'react-native-paper'
import { Text } from '../../Themed';
import { useLightAppTheme } from '../../../themes';
import SolidMaterialIcons from '../SolidMaterialIcons';

const Accordion = ({ title, handleTitlePress }: { title: string, handleTitlePress: (title: string) => void }) => {
  const lightTheme = useLightAppTheme();
  const [expanded, setExpanded] = useState(false);

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
      titleStyle={styles.accordionTitle(lightTheme.textSolidPrimaryColor)}
      style={styles.accordion(lightTheme.textSolidPrimaryColor)}
      right={({ isExpanded }) => <SolidMaterialIcons name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} color={lightTheme.iconSolidPrimaryColor} sizes={24} boxHeight={24} />}
    >
      <Button
        mode="outlined"
        labelStyle={styles.buttonLabel}
        style={styles.button}
        onPress={handleAnimePress}>
        <Text style={{ fontWeight: '400', color: lightTheme.textSolidPrimaryColor }}>
          Anime
        </Text>
      </Button>

      <Button
        mode="outlined"
        labelStyle={styles.buttonLabel}
        style={styles.button}
        onPress={handleMangaPress}>
        <Text style={styles.text(lightTheme.textSolidPrimaryColor)}>
          Manga
        </Text>
      </Button>
    </List.Accordion>
  );
};

const styles = StyleSheet.create<any>({
  accordionTitle: (color: string) => ({
    fontSize: 12,
    width: 39,
    color: color,
  }),
  accordion: (color: string) => ({
    width: 88,
    height: 40,
    padding: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color,
    margin: 0,
    backgroundColor: 'transparent',
  }),
  buttonLabel: {
    fontSize: 12, width: 39
  },
  button: {
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 0,
    borderRadius: 0
  },
  text: (color: string) => ({
    fontWeight: '400',
    color: color,
  })
});

export default Accordion;