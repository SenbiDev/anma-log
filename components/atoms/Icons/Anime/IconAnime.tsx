import React from 'react'
import { SolidMaterialIcons } from '../../Solid'
import { useLightAppTheme } from '../../../../themes'

function IconAnime() {
  const lightTheme = useLightAppTheme();
  return (
    <SolidMaterialIcons name='animation' color={lightTheme.iconSolidPrimaryColor} sizes={20} boxHeight={24} />
  )
}

export default IconAnime