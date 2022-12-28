import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectNowSeasonalList, nowSeasonalListAsync } from '../../../redux/reducers/nowSeasonalListSlice';
import { useLightAppTheme } from '../../../themes';
import { Gap } from '../../atoms';
import Card from '../Card';
import { NowSeasonalListType } from './type';
import { GradientBackground } from '../../atoms';

function NowSeasonalList({ navigation }: NowSeasonalListType) {
  const lightTheme = useLightAppTheme()
  const nowSeasonalList = useAppSelector(selectNowSeasonalList);
  const dispatch = useAppDispatch();
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(nowSeasonalListAsync()), 500);
  }, [dispatch])

  function isLoading() {
    return nowSeasonalList.status === 'loading';
  }

  function wait() {
    return Promise.resolve(setTimeout(() => dispatch(nowSeasonalListAsync()), 500));
  }

  const onRefresh = useCallback(() => {
    setWaiting(true);
    wait();
  }, []);
  
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
        {nowSeasonalList.value.length === 0 &&
          <View style={{ alignItems: 'center' }}>
            <GradientBackground paddingHorizontal={25} paddingVertical={10} onPress={onRefresh}>
              <Text style={styles.text}>{ waiting ? 'Waiting...' : 'Refresh'}</Text>
            </GradientBackground>
          </View>
        }
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
  }),
  text: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'poppins-semiBold'
  }
});

export default NowSeasonalList;