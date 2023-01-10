import React, { useState, useEffect } from 'react'
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Item from '../Item';
import Gap from '../../atoms/Gap';
import { SolidMaterialIcons } from '../../atoms';
import { useLightAppTheme } from '../../../themes';
import { ListType } from './type';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectList, listAsync, setListToInitial } from '../../../redux/reducers/listSlice';

function List({ types, id, navigation }: ListType) {
    const lightTheme = useLightAppTheme()
    const animeList = useAppSelector(selectList);
    const dispatch = useAppDispatch()
    const [text, setText] = useState('1');

    useEffect(() => {
        dispatch(listAsync({ types, id, text }));

        return () => {
            dispatch(setListToInitial());
        }
    }, [dispatch, text, animeList.limit])

    const isFirst = () => {
        return text === '1' ? true : false;
    }

    const isLimited = () => {
        return text === animeList.limit.toString() ? true : false;
    }

    const onChangeText = (text: string) => {
        const strToNumber = Number(text);
        let numberToStr;

        if (strToNumber > animeList.limit) {
            setText((animeList.limit).toString());
            onRefresh((animeList.limit).toString());
        } else if (strToNumber <= 0 || Number.isNaN(strToNumber)) {
            setText('1');
            onRefresh('1');
        } else {
            numberToStr = strToNumber.toString();
            setText(numberToStr);
            onRefresh(numberToStr);
        }
    }

    const onIncrement = () => {
        setText((prevState: string) => {
            const strToNumber = Number(prevState);
            const newValue = strToNumber + 1;
            onRefresh(newValue.toString())
            return newValue.toString();
        });
    }

    const onDecrement = () => {
        setText((prevState: string) => {
            const strToNumber = Number(prevState);
            const newValue = strToNumber - 1;
            onRefresh(newValue.toString())
            return newValue.toString();
        });
    }

    function isLoading() {
        return animeList.status === 'loading';
    }

    function wait(page: string) {
        setTimeout(() => dispatch(listAsync({ types, id, text: page })), 500);
    }

    const onRefresh = React.useCallback((page: string) => {
        wait(page);
    }, [text]);

    return (
        <ScrollView
            style={{ marginHorizontal: 24 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    progressViewOffset={-14}
                    refreshing={isLoading()}
                    onRefresh={() => onRefresh(text)}
                />
            }
        >
            <Gap height={24} />
            {animeList.value?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index} >
                    <Item types={types} mal_id={mal_id} images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
            <View style={styles.pagination(animeList.value?.length)} >
                <SolidMaterialIcons name='keyboard-arrow-left' color={isFirst() ? lightTheme.iconSolidSecondaryColor : lightTheme.iconSolidPrimaryColor} sizes={34} boxHeight={34} onPress={onDecrement} isDisabled={isFirst()} />
                <TextInput mode='outlined' textColor={lightTheme.textSolidPrimaryColor} outlineColor={lightTheme.textSolidPrimaryColor} style={styles.textInput} value={text} onChangeText={onChangeText} />
                <SolidMaterialIcons name='keyboard-arrow-right' color={isLimited() ? lightTheme.iconSolidSecondaryColor : lightTheme.iconSolidPrimaryColor} sizes={34} boxHeight={34} onPress={onIncrement} isDisabled={isLimited()} />
            </View>
            <Gap height={24} />
        </ScrollView>
    )
}

const styles = StyleSheet.create<any>({
    pagination: (length: number) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 24,
        display: length !== 0 ? 'flex' : 'none'
    }),
    textInput: {
        alignSelf: 'flex-start',
        height: 28,
        padding: 0,
        marginTop: -3,
        textAlign: 'center',
        backgroundColor: 'transparent'
    }
})

export default List;