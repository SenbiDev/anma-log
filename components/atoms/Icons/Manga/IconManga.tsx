import React from 'react'
import { SolidMaterialIcons } from '../../Solid'
import { useLightAppTheme } from '../../../../themes'

function IconManga() {
  const lightTheme = useLightAppTheme();
  return (
    <SolidMaterialIcons name='menu-book' color={lightTheme.iconSolidPrimaryColor} sizes={20} boxHeight={24} />
  )
}

export default IconManga;