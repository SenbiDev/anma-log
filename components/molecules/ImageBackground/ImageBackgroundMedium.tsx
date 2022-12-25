import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native';
import { ImageBackgroundType } from './type';


function ImageBackgroundMedium({ source, children }: ImageBackgroundType) {
  return (
      <ImageBackground source={source} style={styles.imageSize} imageStyle={{ borderRadius: 10 }}>
            <View style={styles.viewSize}>
            {children}
            </View>
        </ImageBackground>
  )
}

export default ImageBackgroundMedium

const styles = StyleSheet.create({
    viewSize: {
        width: 225,
        height: 147,
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        borderRadius: 10,
        padding: 0
    },
    imageSize: {
        width: 225,
        height: 147,
        padding: 0
    }
});