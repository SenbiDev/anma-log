import React from 'react';
import { View } from 'react-native';

function Gap({ width, height }: { width?: number | string, height?: number | string }) {
  return (
    <View style={{ width: width, height: height }} />
  );
}
 
export default Gap;