import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { RootStackScreenProps } from '../types';
import { Card } from 'react-native-paper';
import { useLightAppTheme } from '../themes';
import ImageBackground from '../components/molecules/ImageBackground';
import Gap from '../components/atoms/Gap';
// import { SolidMaterialIcons } from '../../atoms';


export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  const lightTheme = useLightAppTheme()
  return (
    <View style={[styles.container, { backgroundColor: lightTheme.colors.background }]}>
      {/* <Card style={{ backgroundColor: lightTheme.cardColor, width: 312, height: 257, marginHorizontal: 24, borderRadius: 5, elevation: 7, shadowOffset: { width: 0, height: 2 }, shadowColor: 'black', shadowOpacity: 1 }}>
        <TouchableOpacity onPress={() => alert('Big Card Anime')}>
          <ImageBackground key={200} size='l' source={{ uri: "https://cdn.myanimelist.net/images/anime/1874/121869l.webp" }} >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <SolidMaterialIcons name='account-circle' color='white' sizes={20} boxHeight={24} />
                <Gap width={6} />
                <Text style={{ color: 'white', fontSize: 12, height: 20 }}>
                  200000 members
                </Text>
              </View>
              <Gap width={8} />
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
                <Gap width={6} />
                <Text style={{ color: 'white', fontSize: 12, height: 20 }}>
                  {8.0 ?? 'Unknown'}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <Gap height={15} />
          <Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 15 }}>
            <View>
              <Text style={{ width: 178, fontSize: 12, color: lightTheme.textSolidPrimaryColor }} numberOfLines={2}>
                Kage no Jitsuryokusha ni Naritakute!
              </Text>
              <Gap height={5} />
              <Text style={{ fontSize: 8, color: lightTheme.textSolidPrimaryColor }}>
                Action, Comedy, Fantasy
              </Text>
            </View>

            <Text style={{ fontSize: 8, color: lightTheme.textSolidPrimaryColor }}>
              Oct 5, 2022 to ?
            </Text>
          </Card.Content>
        </TouchableOpacity>
      </Card> */}

      {/* <Card style={{ backgroundColor: lightTheme.cardColor, width: 312, height: 257, marginHorizontal: 24, borderRadius: 5, elevation: 7, shadowOffset: { width: 0, height: 2 }, shadowColor: 'black', shadowOpacity: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate(type === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })}>
          <ImageBackground key={200} size='l' source={{ uri: images.webp.large_image_url }} >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <SolidMaterialIcons name='account-circle' color='white' sizes={20} boxHeight={24} />
                <Gap width={6} />
                <Text style={{ color: 'white', fontSize: 12, height: 20 }}>
                  {members} members
                </Text>
              </View>
              <Gap width={8} />
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
                <Gap width={6} />
                <Text style={{ color: 'white', fontSize: 12, height: 20 }}>
                  {score ?? 'Unknown'}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <Gap height={15} />
          <Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 15 }}>
            <View>
              <Text style={{ width: 178, fontSize: 12, color: lightTheme.textSolidPrimaryColor }} numberOfLines={2}>
                {title}
              </Text>
              <Gap height={5} />
              <Text style={{ fontSize: 8, color: lightTheme.textSolidPrimaryColor }}>
                {genres.join(', ')}
              </Text>
            </View>

            <Text style={{ fontSize: 8, color: lightTheme.textSolidPrimaryColor }}>
              {
                aired
                  ? aired.string
                  : published
                    ? published.string
                    : 'Unknown'
              }
            </Text>
          </Card.Content>
        </TouchableOpacity>
      </Card> */}



      <Gap height={30} />



      {/* <Card style={{ backgroundColor: lightTheme.cardColor, width: 312, height: 118, marginLeft: 24, borderRadius: 5, elevation: 4, shadowOffset: { width: 0, height: 0 }, shadowColor: 'rgba(0, 0, 0, 0.25)', shadowOpacity: 1 }}>
        <TouchableOpacity style={{ borderRadius: 5, flexDirection: 'row' }} onPress={() => navigation.navigate( types === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })}>
          <Image source={{ uri: images.webp.image_url }} style={{ width: 84, height: 118, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
          <View style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 5 }}>
            <Text style={{ width: 196, fontSize: 12, color: lightTheme.textSolidPrimaryColor }}>
              {title}
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              {type ? `${type} ${epsOrVols}` : 'Unknown'}
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              {
                aired
                  ? aired.string
                  : published
                    ? published.string
                    : 'Unknown'
              }
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              {members ? `${members} members` : 'Unknown'}
            </Text>
            <Gap height={5} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SolidMaterialIcons name='star' color='#FFC702' sizes={10} boxHeight={13} />
              <Gap width={2} />
              <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor, height: 13 }}>
                {score ? score : 'Unknown'}
              </Text>
            </View>
          </View>

        </TouchableOpacity>
      </Card> */}

      {/* <Card style={{ backgroundColor: lightTheme.cardColor, width: 312, height: 118, marginLeft: 24, borderRadius: 5, elevation: 4, shadowOffset: { width: 0, height: 0 }, shadowColor: 'rgba(0, 0, 0, 0.25)', shadowOpacity: 1 }}>
        <TouchableOpacity style={{ borderRadius: 5, flexDirection: 'row' }} onPress={() => alert('Medium Card Anime')}>
          <Image source={{ uri: "https://cdn.myanimelist.net/images/anime/1874/121869.webp" }} style={{ width: 84, height: 118, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
          <View style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 5 }}>
            <Text style={{ width: 196, fontSize: 12, color: lightTheme.textSolidPrimaryColor }}>
              Kage no Jitsuryokusha ni Naritakute!
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              20 ep
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              Oct 5, 2022 to ?
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              200000 members
            </Text>
            <Gap height={5} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SolidMaterialIcons name='star' color='#FFC702' sizes={10} boxHeight={13} />
              <Gap width={2} />
              <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor, height: 13 }}>
                8.0
              </Text>
            </View>
          </View>

        </TouchableOpacity>
      </Card> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
