import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { GradientText } from '../../../components';
import Gap from '../../../components/atoms/Gap';
import { RecommendedList, Genres, Themes, Demographics, TopThree } from '../../../components';
import { RootBottomTabScreenProps } from '../../../types';

function AnimeScreen({ navigation }: RootBottomTabScreenProps<'Anime'>) {
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <StatusBar backgroundColor="#61dafb" /> */}
                <GradientText style={styles.recommendedGradientText} >Recommended Anime</GradientText>
                <Gap height={15} />
                <RecommendedList type='anime' navigation={navigation} />
                <Gap height={50} />
                <GradientText style={styles.genresGradientText} >Genres</GradientText>
                <Gap height={12} />
                <Genres type='anime' navigation={navigation} />
                <Gap height={15} />
                <GradientText style={styles.themesGradientText} >Themes</GradientText>
                <Gap height={12} />
                <Themes type='anime' navigation={navigation} />
                <Gap height={15} />
                <GradientText style={styles.demographicsGradientText} >Demographics</GradientText>
                <Gap height={12} />
                <Demographics type='anime' navigation={navigation} />
                <Gap height={50} />

                <View style={styles.row}>
                    <GradientText style={styles.topGradientText} >Top Anime</GradientText>
                    <TouchableOpacity onPress={() => navigation.navigate('TopListScreen', { types: 'anime' })}>
                        <Text style={styles.moreSolidText}>more</Text>
                    </TouchableOpacity>
                </View>
                <Gap height={15} />
                <TopThree types='anime' navigation={navigation} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    recommendedGradientText: {
        fontSize: 14,
        marginTop: 24,
        marginLeft: 24,
        fontWeight: '600'
    },
    genresGradientText: {
        fontSize: 14,
        marginLeft: 24,
        fontWeight: '600'
    },
    themesGradientText: {
        fontSize: 14,
        marginLeft: 24,
        fontWeight: '600'
    },
    demographicsGradientText: {
        fontSize: 14,
        marginLeft: 24,
        fontWeight: '600'
    },
    row: {
        marginHorizontal: 24,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    topGradientText: {
        fontSize: 14,
        fontWeight: '600',
    },
    moreSolidText: {
        fontSize: 12,
    },
});

export default AnimeScreen;