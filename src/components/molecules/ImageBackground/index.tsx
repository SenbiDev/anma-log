import React from 'react';
import ImageBackgroundMedium from './ImageBackgroundMedium';
import ImageBackgroundLarge from './ImageBackgroundLarge';
import { ImageBackgroundType } from './type';

function ImageBackground({ size, source, children }: { size: 'm' | 'l' } & ImageBackgroundType) {
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