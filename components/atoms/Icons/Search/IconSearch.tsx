import React from 'react'
import SolidMaterialIcons from '../../SolidMaterialIcons';
import { useLightAppTheme } from '../../../../themes'

function IconSearch() {
  const lightTheme = useLightAppTheme();
  return (
    <SolidMaterialIcons name='search' color={lightTheme.iconSolidPrimaryColor} sizes={20} boxHeight={24} />
  )
}

export default IconSearch;