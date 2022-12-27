import React, { useEffect } from 'react'
import { ScrollView, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectUpComingSeasonalList, upComingSeasonalListAsync } from '../../../redux/reducers/upComingSeasonalListSlice';
import { useLightAppTheme } from '../../../themes';
import { Gap } from '../../atoms';
import Card from '../Card';


function UpComingSeasonalList({navigation}: any) {
    const lightTheme = useLightAppTheme()
    const upComingSeasonalList = useAppSelector(selectUpComingSeasonalList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(upComingSeasonalListAsync());
    },[dispatch])

    function isLoading() {
        return upComingSeasonalList.status === 'loading';
    }

    function wait() {
        setTimeout(() => dispatch(upComingSeasonalListAsync()), 1000);
    }

    const onRefresh = React.useCallback(() => {
        wait();
    }, []);

    console.log('up coming seasonal list IS LOADING:', isLoading());

    return (
        <View>
          <Text style={styles.label(lightTheme.textSolidPrimaryColor)} >{upComingSeasonalList.seasonalName}</Text>
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
            {upComingSeasonalList.value?.map(({ mal_id, images, title, genreList, aired, members, score }, index) => (
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

export default UpComingSeasonalList;