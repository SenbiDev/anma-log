import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GapType } from './type';

function Gap({ width, height }: GapType) {
  return (
    <View style={styles.gap(width, height)} />
  );
}

const styles = StyleSheet.create<any>({
  gap: (width: number, height: number) => ({
    width: width,
    height: height,
  })
})
 
export default Gap;