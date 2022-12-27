import React, { useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { GradientBackground, Gap } from '../../atoms';
import { ArchiveListType } from './type';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectArchiveList, archiveListAsync } from '../../../redux/reducers/archiveListSlice';

function ArchiveList({ navigation }: ArchiveListType) {
    const archives = useAppSelector(selectArchiveList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(archiveListAsync());
        }, 1500)
    }, [dispatch]);

    function isLoading() {
        return archives.status === 'loading';
    }

    function wait() {
        setTimeout(() => dispatch(archiveListAsync()), 1500);
    }

    const onRefresh = React.useCallback(() => {
        wait();
    }, []);

    console.log('archive list IS LOADING:', isLoading());

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    progressViewOffset={-50}
                    refreshing={isLoading()}
                    onRefresh={onRefresh}
                />
            }
        >
            {archives.value?.map(({ year, seasons }, index) => (
                <View key={index} style={styles.container}>
                    <View style={styles.butonsRow}>
                        {seasons[0] &&
                            <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[0] })}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {year}
                                    </Text>
                                    <Text style={styles.text}>
                                        {seasons[0]}
                                    </Text>
                                </View>
                            </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[1] &&
                            <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[1] })}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {year}
                                    </Text>
                                    <Text style={styles.text}>
                                        {seasons[1]}
                                    </Text>
                                </View>
                            </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[2] &&
                            <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[2] })}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {year}
                                    </Text>
                                    <Text style={[styles.text, { width: 43 }]}>
                                        {seasons[2]}
                                    </Text>
                                </View>
                            </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[3] &&
                            <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[3] })}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {year}
                                    </Text>
                                    <Text style={styles.text}>
                                        {seasons[3]}
                                    </Text>
                                </View>
                            </GradientBackground>
                        }
                    </View>
                    <Gap height={15} />
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
    },
    butonsRow: {
        flexDirection: 'row',
    },
    column: {
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'poppins-semiBold',
    }
})

export default ArchiveList