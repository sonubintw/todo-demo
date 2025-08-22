import React, {Fragment, memo} from 'react';
// import moment from 'moment';
// import {colors, fonts} from '../theme';
// import {Todo} from '../redux/todoSlice';
import {Avatar} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Todo } from '../../redux/slice/todoTypes';
import { colors } from '../../themes/colors';
import { fontSizes } from '../../global/fontSize';
import { fonts } from '../../themes/fonts';
import { getCurrentTimestamp } from '../../global/globalFunctions';
import { nomenclature } from '../../constants/nomenclature';
import { Feather } from '@react-native-vector-icons/feather';

interface TodoItemProps {
  item: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoCard = memo(({item, onToggle, onEdit, onDelete}: TodoItemProps) => {

  const sameTime = item.created_at === item.updated_at;

  const ActionView = () => (
    <Fragment>
      <TouchableOpacity onPress={onEdit}>
        <Feather 
          name="edit" 
          color={colors.addButton}
          size={25} />

      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Feather 
          name="delete" 
          color={colors.error} 
          size={25} />
      </TouchableOpacity>
    </Fragment>
  );

  return (
    <View style={styles.item}>
      <BouncyCheckbox
        size={26}
        hitSlop={30}
        disableText={true}
        onPress={onToggle}
        fillColor={colors.success}
        unFillColor={colors.accent}
        innerIconStyle={{borderWidth: 0}}
        iconStyle={{borderColor: colors.accent}}
        useBuiltInState={true}
        isChecked={item.completed}
      />
      <View style={styles.textContainer} id="texts-container">
        <Text
          style={[
            styles.title,
            {textDecorationLine: item.completed ? 'line-through' : 'none'},
          ]}>
          {item.title}
        </Text>
        <Text style={[styles.title, {fontSize:fontSizes.xs}]}>
          {!sameTime && nomenclature.UPDATED_AT}
          {getCurrentTimestamp()}
        </Text>
      </View>
      <ActionView />
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    gap: 10,
    padding: 24,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border,
    backgroundColor: colors.cardBlack,
    justifyContent: 'space-between',
  },
  textContainer: {
    gap: 10,
    flex: 1,
    maxWidth: '70%',
    marginLeft: 5,
  },
  title: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontFamily: fonts.regular,
  },
});

export default TodoCard;
