import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, RefreshControl, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectUpComingSeasonalList, upComingSeasonalListAsync } from '../../../redux/reducers/upComingSeasonalListSlice';
import { useLightAppTheme } from '../../../themes';
import { Gap } from '../../atoms';
import Card from '../Card';
import { UpComingSeasonalListType } from './type';

function UpComingSeasonalList({ navigation }: UpComingSeasonalListType) {
  const lightTheme = useLightAppTheme()
  const upComingSeasonalList = useAppSelector(selectUpComingSeasonalList);
  const dispatch = useAppDispatch();
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(upComingSeasonalListAsync()), 1500);
  }, [dispatch])

  function isLoading() {
    return upComingSeasonalList.status === 'loading';
  }

  function wait() {
    return Promise.resolve(setTimeout(() => dispatch(upComingSeasonalListAsync()), 1500));
  }

  const onRefresh = useCallback(() => {
    setWaiting(true);
    wait();
  }, []);

  return (
    <View>
      <Text style={styles.label(lightTheme.textSolidPrimaryColor)} >{upComingSeasonalList.seasonalName}</Text>
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
        {upComingSeasonalList.value?.map(({ mal_id, images, title, genreList, aired, members, score }, index) => (
          <View key={index} >
            <Card type={'anime'} mal_id={mal_id} images={images} title={title} genres={genreList} aired={aired} members={members} score={score} navigation={navigation} />
            <Gap height={15} />
          </View>
        ))}
        {upComingSeasonalList.value.length === 0 &&
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

export default UpComingSeasonalList;