import React from 'react'
import { ScrollView, View, Text, StyleSheet }  from 'react-native';
import Card from '../Card';
import Gap from '../../atoms/Gap';
import { useLightAppTheme } from '../../../themes';

function SeasonalOrFavoriteOfList({ type, list, label, navigation }: { type: 'anime' | 'manga', list: { mal_id: number, images: any, title: string, genreList: string[], aired?: any, published?: any, members: number, score: number, season?: string, year?: number }[], label: string, navigation: any }) {
  const lightTheme = useLightAppTheme();
  return (
    <View>
      <Text style={styles.label(lightTheme.textSolidPrimaryColor)} >{label ?? 'Up Coming'}</Text>
      <Gap height={20} />
      <ScrollView showsVerticalScrollIndicator={false}>
          { list?.map(({ mal_id, images, title, genreList, aired, published, members, score }, index) => (
              <View key={index} >
                  <Card type={type} mal_id={mal_id} images={images} title={title} genres={genreList} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                  <Gap height={15} />
              </View>
          ))}
          <Gap height={70} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create<any>({
  label: (color: string) => ({
    fontSize: 14,
    marginLeft: 24,
    fontWeight: '600',
    color: color,
  })
});

export default SeasonalOrFavoriteOfList