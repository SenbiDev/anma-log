import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import Item from '../Item';
import Gap from '../../atoms/Gap';
import { TopThreeType } from './type';

function TopThree({ types, topThreeList, navigation }: TopThreeType) {
    return (
        <>
            {topThreeList?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index}>
                    <Item types={types} mal_id={mal_id} images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
        </>
    )
}

export default TopThree