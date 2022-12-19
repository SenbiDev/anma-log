import React from 'react'
import { View, ImageBackground, ImageSourcePropType, StyleSheet } from 'react-native';


function ImageBackgroundLarge({ source, children }: { source?: ImageSourcePropType, children: React.ReactNode }) {
  return (
      <ImageBackground source={source} style={styles.imageSize} imageStyle={{  borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
            <View style={styles.viewSize}>
            {children}
            </View>
        </ImageBackground>
  )
}

export default ImageBackgroundLarge

const styles = StyleSheet.create({
    viewSize: {
        width: 312,
        height: 174,
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 0
    },
    imageSize: {
        width: 312,
        height: 174,
        padding: 0
    }
});