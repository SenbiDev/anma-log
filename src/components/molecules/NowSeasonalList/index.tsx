import React, { useEffect } from 'react'
import { ScrollView, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectNowSeasonalList, nowSeasonalListAsync } from '../../../redux/reducers/nowSeasonalListSlice';
import { useLightAppTheme } from '../../../themes';
import { Gap } from '../../atoms';
import Card from '../Card';


function NowSeasonalList({navigation}: any) {
    const lightTheme = useLightAppTheme()
    const nowSeasonalList = useAppSelector(selectNowSeasonalList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(nowSeasonalListAsync());
    },[dispatch])

    function isLoading() {
        return nowSeasonalList.status === 'loading';
    }

    function wait() {
        setTimeout(() => dispatch(nowSeasonalListAsync()), 1000);
    }

    const onRefresh = React.useCallback(() => {
        wait();
    }, []);

    console.log('now seasonal list IS LOADING:', isLoading());

    return (
        <View>
          <Text style={styles.label(lightTheme.textSolidPrimaryColor)} >{nowSeasonalList.seasonalName}</Text>
          <Gap height={20} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                progressViewOffset={-64}
                refreshing={isLoading()}
                onRefresh={onRefresh}
              />
            }
          >
            {nowSeasonalList.value?.map(({ mal_id, images, title, genreList, aired, members, score }, index) => (
              <View key={index} >
                <Card type={'anime'} mal_id={mal_id} images={images} title={title} genres={genreList} aired={aired} members={members} score={score} navigation={navigation} />
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

export default NowSeasonalList;