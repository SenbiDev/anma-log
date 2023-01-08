import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper'
import { useLightAppTheme } from '../../../themes';
import SolidMaterialIcons from '../SolidMaterialIcons';
import { AccordionType } from './type';
import Gap from '../Gap';

const Accordion = ({ title, handleTitlePress }: AccordionType) => {
  const lightTheme = useLightAppTheme();
  const [expanded, setExpanded] = useState<boolean>(false);

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
      <Gap height={10} />
      <TouchableOpacity onPress={handleAnimePress}>
        <Text style={styles.text(lightTheme.textSolidPrimaryColor)}>
          Anime
        </Text>
      </TouchableOpacity>
      <Gap height={10} />
      <TouchableOpacity onPress={handleMangaPress}>
        <Text style={styles.text(lightTheme.textSolidPrimaryColor)}>
          Manga
        </Text>
      </TouchableOpacity>
    </List.Accordion>
  );
};

const styles = StyleSheet.create<any>({
  accordionTitle: (color: string) => ({
    fontSize: 12,
    fontFamily: 'poppins-regular',
    width: 42,
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
  text: (color: string) => ({
    fontFamily: 'poppins-regular',
    fontSize: 12,
    color: color,
    marginLeft: 7
  })
});

export default Accordion;