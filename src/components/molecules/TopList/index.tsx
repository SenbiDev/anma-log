import React, { useEffect } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native';
import Item from '../Item';
import Gap from '../../atoms/Gap';
import { TopListType } from './type';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectTopList, topListAsync, setTopListToInitial } from '../../../redux/reducers/topListSlice';

function TopList({ types, navigation }: TopListType) {
    const topList = useAppSelector(selectTopList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(topListAsync(types));

        return () => {
            dispatch(setTopListToInitial());
        }
    }, [dispatch])

    function isLoading() {
        return topList.status === 'loading'
    }

    function wait() {
        setTimeout(() => dispatch(topListAsync(types)), 1000);
    }

    const onRefresh = React.useCallback(() => {
        wait();
    }, []);

    console.log('top list IS LOADING:', isLoading());


    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    progressViewOffset={-34}
                    refreshing={isLoading()}
                    onRefresh={onRefresh}
                />
            }
        >
            {topList.value?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index}>
                    <Item types={types} mal_id={mal_id} images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
            <Gap height={34} />
        </ScrollView>
    )
}

export default TopList