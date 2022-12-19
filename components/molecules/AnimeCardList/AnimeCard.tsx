import React from 'react'
import { View as ViewDefault, Text as TextDefault } from 'react-native';
import { View, Text } from '../../Themed';
import Gap from '../../atoms/Gap/Gap';
import ImageBackground from '../ImageBackground/ImageBackground';
import { SolidMaterialIcons } from '../../atoms/Solid';

function AnimeCard() {
    return (
        <View style={{ width: 312, height: 257, marginHorizontal: 24, borderRadius: 5, elevation: 7, shadowOffset: { width: 0, height: 2 }, shadowColor: 'black', shadowOpacity: 1 }}>
            <ImageBackground key={200} size='l' source={require('../../../assets/images/kage.png')} >
                <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>
                    <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <SolidMaterialIcons name='account-circle' color='white' sizes={20} boxHeight={24} />
                        <Gap width={6} />
                        <TextDefault style={{ color: 'white', fontSize: 12, height: 20 }}>
                            230,233
                        </TextDefault>
                    </ViewDefault>
                    <Gap width={8} />
                    <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
                        <Gap width={6} />
                        <TextDefault style={{ color: 'white', fontSize: 12, height: 20 }}>
                            7.81
                        </TextDefault>
                    </ViewDefault>
                </ViewDefault>
            </ImageBackground>

            <Gap height={15} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 15 }}>
                <View>
                    <Text style={{ width: 138, fontSize: 12 }}>
                        Kage no Jitsuryokusha ni Naritakute!
                    </Text>
                    <Gap height={5} />
                    <Text style={{ fontSize: 8 }}>
                        Action, Comedy, Fantasy
                    </Text>
                </View>

                <Text style={{ fontSize: 8 }}>
                    Oct 5, 2022 to ?
                </Text>
            </View>

        </View>
    )
}

export default AnimeCard