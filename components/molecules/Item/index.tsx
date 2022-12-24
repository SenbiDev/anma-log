import React from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Gap from '../../atoms/Gap';
import { SolidMaterialIcons } from '../../atoms';
import { useLightAppTheme } from '../../../themes';


function Item({ types, mal_id, images, title, type, episodes, volumes, aired, published, members, score, navigation }: { types: 'anime' | 'manga', mal_id: number, images: any, title: string, type: string, episodes?: number, volumes?: number, aired?: any, published?: any, members: number, score: number, navigation: any }) {
    const lightTheme = useLightAppTheme();
    const epsOrVols = episodes ? `(${episodes ?? 'Unknown'} eps)` : `(${volumes ?? 'Unknown'} vols)`;
    return (
        <Card style={styles.card(lightTheme.cardColor)}>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate( types === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })}>
          <Image source={{ uri: images.webp.image_url }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.titleText(lightTheme.textSolidPrimaryColor)}>
              {title}
            </Text>
            <Gap height={5} />
            <Text style={styles.typeText(lightTheme.textSolidPrimaryColor)}>
              {type ? `${type} ${epsOrVols}` : 'Unknown'}
            </Text>
            <Gap height={5} />
            <Text style={styles.dateText(lightTheme.textSolidPrimaryColor)}>
              {
                aired
                  ? aired.string
                  : published
                    ? published.string
                    : 'Unknown'
              }
            </Text>
            <Gap height={5} />
            <Text style={styles.membersText(lightTheme.textSolidPrimaryColor)}>
              {members ? `${members} members` : 'Unknown'}
            </Text>
            <Gap height={5} />

            <View style={styles.scoreContainer}>
              <SolidMaterialIcons name='star' color='#FFC702' sizes={10} boxHeight={13} />
              <Gap width={2} />
              <Text style={styles.scoreText(lightTheme.textSolidPrimaryColor)}>
                {score ? score : 'Unknown'}
              </Text>
            </View>
          </View>

        </TouchableOpacity>
      </Card>
    )
}

const styles = StyleSheet.create<any>({
  card: (color: string) => ({
    backgroundColor: color,
    width: 312,
    height: 118,
    marginLeft: 24,
    borderRadius: 5,
    elevation: 7,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 1
  }),
  touchable: {
    borderRadius: 5,
    flexDirection: 'row'
  },
  image: {
    width: 84,
    height: 118,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5
  },
  titleText: (color: string) => ({
    width: 196,
    fontSize: 12,
    color: color
  }),
  typeText: (color: string) => ({
    fontSize: 8,
    color: color
  }),
  dateText: (color: string) => ({
    fontSize: 8,
    color: color
  }),
  membersText: (color: string) => ({
    fontSize: 8,
    color: color  
  }),
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scoreText: (color: string) => ({
    fontSize: 8,
    color: color,
    height: 13
  })
})

export default Item