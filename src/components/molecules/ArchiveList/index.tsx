import React, { useState, useEffect, useCallback } from 'react'
import { View, TouchableOpacity, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Gap } from '../../atoms';
import { ArchiveListType } from './type';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectArchiveList, archiveListAsync } from '../../../redux/reducers/archiveListSlice';

function ArchiveList({ navigation }: ArchiveListType) {
    const archives = useAppSelector(selectArchiveList);
    const dispatch = useAppDispatch();
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        setTimeout(() => dispatch(archiveListAsync()), 1500);
    }, [dispatch]);

    function isLoading() {
        return archives.status === 'loading';
    }

    function wait() {
        setTimeout(() => dispatch(archiveListAsync()), 1500);
    }

    const onRefresh = useCallback(() => {
        setWaiting(true);
        wait();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
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
                <View key={index}>
                    <View style={styles.butonsRow}>
                        {seasons[0] &&
                            <TouchableOpacity style={styles.seasonalButton} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[0] })}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {year}
                                    </Text>
                                    <Text style={styles.text}>
                                        {seasons[0]}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <Gap width={12} />
                        {seasons[1] &&
                            <TouchableOpacity style={styles.seasonalButton} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[1] })}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {year}
                                    </Text>
                                    <Text style={styles.text}>
                                        {seasons[1]}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <Gap width={12} />
                        {seasons[2] &&
                            <TouchableOpacity style={styles.seasonalButton} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[2] })}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {year}
                                    </Text>
                                    <Text style={styles.text}>
                                        {seasons[2]}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <Gap width={12} />
                        {seasons[3] &&
                            <TouchableOpacity style={styles.seasonalButton} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[3] })}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {year}
                                    </Text>
                                    <Text style={styles.text}>
                                        {seasons[3]}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <Gap height={15} />
                </View>
            ))}
            {(archives.value?.length === 0 || archives.value === undefined) &&
                <View style={styles.refreshButtonContainer}>
                    <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
                        <Text style={styles.text}>{waiting ? 'Waiting...' : 'Refresh'}</Text>
                    </TouchableOpacity>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    seasonalButton: {
        alignSelf: 'flex-start',
        borderRadius: 3,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: 'rgba(0, 102, 255, 1)',
        width: 74,
        height: 40,
    },
    refreshButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35
    },
    refreshButton: {
        alignSelf: 'flex-start',
        borderRadius: 3,
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 102, 255, 1)',
    },
})

export default ArchiveList