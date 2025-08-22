import React, {useState, useEffect} from 'react';
import {
  Dialog,
  Portal,
  TextInput,
  Button,
  HelperText,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {updateTodo} from '../../redux/slice/todoSlice'
import {StyleSheet, ToastAndroid} from 'react-native';
import { fonts } from '../../themes/fonts';
import { colors } from '../../themes/colors';
import { fontSizes } from '../../global/fontSize';
import { nomenclature } from '../../constants/nomenclature';

interface EditDialogProps {
  visible: boolean;
  onDismiss: () => void;
  todoId: string | null;
  initialTitle: string;
}

const EditDialog = ({
  visible,
  onDismiss,
  todoId,
  initialTitle,
}: EditDialogProps) => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (visible) {
      setTitle(initialTitle);
      setError('');
    }
  }, [visible, initialTitle]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError(nomenclature.TITLE_ERROR);
      return;
    }

    if (todoId !== null) {
      dispatch(updateTodo({id: todoId, title}));
      onDismiss();
      ToastAndroid.show(nomenclature.TODO_SUCCESS, nomenclature.TOAST_TIMER);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title style={{fontFamily: fonts.regular, color: colors.border}}>
          {nomenclature.EDIT_TASK}
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Todo Title"
            value={title}
            onChangeText={text => {
              setTitle(text);
              if (text.trim()) setError('');
            }}
            multiline
            numberOfLines={3}
            error={!!error}
            mode="flat"
            style={styles.input}
            outlineColor={colors.card}
            activeOutlineColor={colors.accent}
            contentStyle={styles.inputContent}
          />
          {!!error && (
            <HelperText type="error" style={styles.helper}>
              {error}
            </HelperText>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} labelStyle={styles.label}>
            Cancel
          </Button>
          <Button
            mode="contained"
            labelStyle={styles.label}
            onPress={() => handleSubmit()}
            style={styles.updateBtn}>
            Update
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 8,
    backgroundColor: colors.coolTonedgrey,
  },
  input: {
    // marginTop: 10,
    backgroundColor: colors.inputBackground,
  },
  inputContent: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontFamily: fonts.regular,
  },
  helper: {
    fontSize: fontSizes.xs,
    color: colors.error,
    fontFamily: fonts.regular,
  },
  label: {
    fontSize: fontSizes.sm,
    color: colors.border,
    fontFamily: fonts.regular,
  },
  updateBtn: {
    borderRadius: 4,
    backgroundColor: colors.success,
  },
});

export default EditDialog;
