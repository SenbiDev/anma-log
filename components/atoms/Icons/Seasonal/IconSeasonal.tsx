import React from 'react'
import { SolidMaterialIcons } from '../../Solid'
import { useLightAppTheme } from '../../../../themes'

function IconSeasonal() {
  const lightTheme = useLightAppTheme();
  return (
    <SolidMaterialIcons name='date-range' color={lightTheme.iconSolidPrimaryColor} sizes={20} boxHeight={24} />
  )
}

export default IconSeasonal;