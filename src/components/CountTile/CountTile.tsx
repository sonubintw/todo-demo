import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { fonts } from '../../themes/fonts';
import { colors } from '../../themes/colors';
import { fontSizes } from '../../global/fontSize';

interface CountTileProps {
  title: string;
  count: number;
}
const CountTile = ({title, count}: CountTileProps) => {
  const isActive = title === 'Active';
  const isCompleted = title === 'Done';
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title} :{' '}
        <Text
          style={{
            fontFamily: fonts.semibold,
            color: isCompleted
              ? colors.success
              : isActive
              ? colors.error
              : colors.black,
          }}>
          {count}
        </Text>
      </Text>
    </View>
  );
};

export default CountTile;

const styles = StyleSheet.create({
  container: {
    width: '32%',
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.border,
    backgroundColor: colors.accent,
  },
  title: {
    fontSize: fontSizes.md,
    fontFamily: fonts.medium,
    color: colors.black,
  },
});
