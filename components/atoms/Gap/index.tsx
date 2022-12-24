import React from 'react';
import { View, StyleSheet } from 'react-native';

function Gap({ width, height }: { width?: number | string, height?: number | string }) {
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