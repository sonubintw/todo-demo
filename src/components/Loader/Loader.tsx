import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../themes/colors';
import { globalStyles } from '../../global/globalStyles';

const Loader = () => {
  return (
    <ActivityIndicator
      size={'large'}
      color={colors.accent}
      style={globalStyles.centeredContainer}
    />
  );
};

export default Loader;
