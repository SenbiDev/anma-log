import React from 'react'
import SolidMaterialIcons from '../../SolidMaterialIcons';
import { useLightAppTheme } from '../../../../themes'

function IconFavorites() {
  const lightTheme = useLightAppTheme();
  return (
    <SolidMaterialIcons name='favorite' color={lightTheme.iconSolidPrimaryColor} sizes={20} boxHeight={24} />
  )
}

export default IconFavorites;