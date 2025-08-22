import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/slice/todoSlice";

export const useTodo=()=>{
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSave = () => {
    if (!title.trim()) {
      setError('Please enter title');
      return;
    }

    dispatch(addTodo(title) as any);
    ToastAndroid.show('TODO added successfully!!', 2000);
    navigation.goBack();
  };

  return{
    dispatch,
    navigation,
    title,
    setTitle,
    error,
    setError,
    handleSave
  }
}