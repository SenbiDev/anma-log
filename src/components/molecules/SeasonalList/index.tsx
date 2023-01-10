import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, RefreshControl, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectSeasonalList, seasonalListAsync, setSeasonalListToInitial } from '../../../redux/reducers/seasonalListSlice';
import { useLightAppTheme } from '../../../themes';
import { Gap } from '../../atoms';
import Card from '../Card';
import { SeasonalListType } from './type';

function SeasonalList({ year, season, navigation }: SeasonalListType) {
  const lightTheme = useLightAppTheme()
  const seasonalList = useAppSelector(selectSeasonalList);
  const dispatch = useAppDispatch();
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    dispatch(seasonalListAsync({ year, season }));

    return () => {
      dispatch(setSeasonalListToInitial());
    }
  }, [dispatch])

  function isLoading() {
    return seasonalList.status === 'loading';
  }

  function wait() {
    return Promise.resolve(setTimeout(() => dispatch(seasonalListAsync({ year, season })), 1000));
  }

  const onRefresh = useCallback(() => {
    setWaiting(true);
    wait();
  }, []);

  return (
    <View>
      <Text style={styles.label(lightTheme.textSolidPrimaryColor)} >{`${season?.toUpperCase()} ${year}`}</Text>
      <Gap height={20} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressViewOffset={-64}
            refreshing={isLoading()}
            onRefresh={onRefresh}
          />
        }
      >
        {seasonalList.value?.map(({ mal_id, images, title, genreList, aired, members, score }, index) => (
          <View key={index} >
            <Card type={'anime'} mal_id={mal_id} images={images} title={title} genres={genreList} aired={aired} members={members} score={score} navigation={navigation} />
            <Gap height={15} />
          </View>
        ))}
        {seasonalList.value.length === 0 &&
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onRefresh}>
              <Text style={styles.text}>{ waiting ? 'Waiting...' : 'Refresh'}</Text>
            </TouchableOpacity>
          </View>
        }
        <Gap height={70} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create<any>({
  scroll: {
    marginHorizontal: 24,
  },
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'flex-start',
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 102, 255, 1)',
  },
});

export default SeasonalList;