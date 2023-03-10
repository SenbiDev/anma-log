import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card as CardRNP } from 'react-native-paper';
import Gap from '../../atoms/Gap';
import ImageBackground from '../ImageBackground';
import { SolidMaterialIcons } from '../../atoms';
import { useLightAppTheme } from '../../../themes';
import { CardType } from './type';

function Card({ type, mal_id, images, title, genres, aired, published, members, score, navigation }: CardType) {
    const lightTheme = useLightAppTheme();
    const US = Intl.NumberFormat("en-US", {
      currency: "USD",
    });

    return (
        <CardRNP style={styles.card(lightTheme.cardColor)}>
        <TouchableOpacity onPress={() => navigation.navigate(type === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })}>
          <ImageBackground key={200} size='l' source={{ uri: images.webp.large_image_url }} >
            <View style={styles.cardImageBackground}>
              <View style={styles.membersContainer}>
                <SolidMaterialIcons name='account-circle' color='white' sizes={20} boxHeight={24} />
                <Gap width={6} />
                <Text style={styles.membersText}>
                  {US.format(members)} members
                </Text>
              </View>
              <Gap width={8} />
              <View style={styles.scoreContainer}>
                <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
                <Gap width={6} />
                <Text style={styles.scoreText}>
                  {score ?? 'Unknown'}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <Gap height={15} />
          <CardRNP.Content style={styles.cardContent}>
            <View>
              <Text style={styles.titleText(lightTheme.textSolidPrimaryColor)} numberOfLines={2}>
                {title}
              </Text>
              <Gap height={5} />
              <Text style={styles.genresText(lightTheme.textSolidPrimaryColor)}>
                {genres.join(', ')}
              </Text>
            </View>

            <Text style={styles.dateText(lightTheme.textSolidPrimaryColor)}>
              {
                aired
                  ? aired.string
                  : published
                    ? published.string
                    : 'Unknown'
              }
            </Text>
          </CardRNP.Content>
        </TouchableOpacity>
      </CardRNP>
    )
}

const styles = StyleSheet.create<any>({
  card: (color: string) => ({
    backgroundColor: color,
    width: '100%',
    height: 257,
    borderRadius: 5,
    elevation: 7,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.5
  }),
  cardImageBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  membersContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  membersText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'poppins-regular',
    height: 20
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  scoreText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'poppins-regular',
    height: 20
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 15
  },
  titleText: (color: string) => ({
    width: 178,
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: color,
  }),
  genresText: (color: string) => ({
    fontSize: 8,
    fontFamily: 'poppins-regular',
    color: color,
    width: 158,
  }),
  dateText: (color: string) => ({
    fontSize: 8,
    fontFamily: 'poppins-regular',
    color: color
  })
})

export default Card