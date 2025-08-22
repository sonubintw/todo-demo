import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTodoCounts,
  selectFilterAndSortedTodos,
  getTodos,
  toggleTodo,
  deleteTodo,
} from '../../redux/slice/todoSlice';
import { RootState } from '../../redux/store';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ToastAndroid } from 'react-native';

interface SelectedTodo {
  id: string;
  title: string;
}

export const useDashboard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  //states
  const [selectedTodo, setSelectedTodo] = useState<SelectedTodo | null>(null);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);

  //redux
  const dispatch = useDispatch();
  const todos = useSelector(selectFilterAndSortedTodos);
  const { total, active, completed } = useSelector(getTodoCounts);
  const { status, filterBy, sortBy } = useSelector(
    (state: RootState) => state.todo,
  );

  const countLabelWithValues = [
    { id: 1, title: 'Total', value: total },
    { id: 2, title: 'Active', value: active },
    { id: 3, title: 'Done', value: completed },
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Done', value: 'done' },
  ];

  const sortOptions = [
    { label: 'By ID', value: 'id' },
    { label: 'Most Recent', value: 'recent' },
  ];

  useEffect(() => {
    dispatch(getTodos() as any);
  }, [dispatch]);

  //toggle TODO status
  const handleToggleTodo = useCallback(
    (id: string, completed: boolean) => {
      const message = !completed ? 'task completed 🎉🎉' : 'you can do this!!';
      dispatch(toggleTodo(id));
      ToastAndroid.show(message, 2000);
    },
    [dispatch],
  );

  //delete todo
  const handleDeleteTodo = useCallback((id: string) => {
    dispatch(deleteTodo(id));
    ToastAndroid.show('task deleted', 2000);
  }, []);

  //edit todo
  const handleEditTodo = (id: string, title: string) => {
    setSelectedTodo({ id, title });
    setVisibleDialog(true);
  };

  return {
    todos,
    total,
    active,
    completed,
    status,
    filterBy,
    sortBy,
    visibleDialog,
    dispatch,
    setVisibleDialog,
    selectedTodo,
    setSelectedTodo,
    navigation,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    countLabelWithValues,
    sortOptions,
    filters
  };
};
