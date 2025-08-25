import React from 'react';
import {View, StyleSheet} from 'react-native';
import CountTile from '../CountTile/CountTile';
import { colors } from '../../themes/colors';
import { fonts } from '../../themes/fonts';
import { fontSizes } from '../../global/fontSize';

interface CountProps {
  total: number;
  completed: number;
}

const ListHeader = ({total, completed}: CountProps) => {
  return (
    <View style={styles.container}>     
      <View style={styles.countView}>
        <CountTile title="Total" count={total} />
        <CountTile title="Completed" count={completed} />
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: fontSizes.md,
    marginBottom: 3,
    color: colors.text,
    fontFamily: fonts.medium,
  },
  subTitle: {
    fontFamily: fonts.medium,
    color: colors.text,
    fontSize: fontSizes.lg,
    marginBottom: 10,
  },
  countView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
