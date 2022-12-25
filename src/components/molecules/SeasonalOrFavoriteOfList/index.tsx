import React from 'react'
import { ScrollView, View, Text, StyleSheet }  from 'react-native';
import Card from '../Card';
import Gap from '../../atoms/Gap';
import { useLightAppTheme } from '../../../themes';
import { SeasonalOrFavoriteOfListType } from './type';

function SeasonalOrFavoriteOfList({ type, list, label, navigation }: SeasonalOrFavoriteOfListType) {
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
    fontSize: 12,
    marginLeft: 24,
    fontFamily: 'poppins-semiBold',
    color: color,
  })
});

export default SeasonalOrFavoriteOfList