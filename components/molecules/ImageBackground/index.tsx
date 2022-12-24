import React from 'react';
import { ImageSourcePropType } from 'react-native';
import ImageBackgroundMedium from './ImageBackgroundMedium';
import ImageBackgroundLarge from './ImageBackgroundLarge';

function ImageBackground({ size, source, children }: { size: 'm' | 'l', source?: ImageSourcePropType, children: React.ReactNode }) {
  return (
    <>
        { size === 'm' &&
            <ImageBackgroundMedium source={source}>
                {children}
            </ImageBackgroundMedium>
        }
        { size === 'l' &&
            <ImageBackgroundLarge source={source}>
                {children}
            </ImageBackgroundLarge>
        }
    </>
  )
}

export default ImageBackground