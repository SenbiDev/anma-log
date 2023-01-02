import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../../../navigation/type';
import 'intl'
import 'intl/locale-data/jsonp/en';

function SplashScreen({ navigation }: RootStackScreenProps<'SplashScreen'>) {

    useEffect(() => {
        setTimeout(() => navigation.replace('Root'), 2000)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text} >anma-log</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 102, 255, 1)',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'poppins-semiBold',
    }
});

export default SplashScreen;