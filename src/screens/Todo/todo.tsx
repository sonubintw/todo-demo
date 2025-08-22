import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput, HelperText } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../themes/colors';
import { todoStyles } from './todoStyle';
import { globalStyles } from '../../global/globalStyles';
import { useTodo } from './useTodo';
import { nomenclature } from '../../constants/nomenclature';

const AddTodoScreen = () => {
    const {
        title,
        setTitle,
        error,
        handleSave
    } = useTodo()

    return (
        <SafeAreaView style={[globalStyles.rootContainer]}>

            <View style={{ marginBlock: 30, gap: 10}}>
                <Text style={todoStyles.heading}>{nomenclature.ENTER_TODO}</Text>
                <TextInput
                    value={title}
                    error={!!error}
                    onChangeText={setTitle}
                    placeholderTextColor={colors.black}
                    placeholder="Add new todo.."
                    autoFocus={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    mode="outlined"
                    outlineColor={colors.card}
                    activeOutlineColor={colors.card}
                    contentStyle={todoStyles.inputContent}
                    style={{ backgroundColor: colors.coolTonedgrey ,color:'red'}}
                />
                {!!error && (
                    <HelperText type="error" style={todoStyles.helper} visible={!!error}>
                        {error}
                    </HelperText>
                )}
            </View>

            <TouchableOpacity
                activeOpacity={0.5}
                style={todoStyles.btn}
                onPress={handleSave}>
                <Text style={todoStyles.btnText}>Add TODO</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AddTodoScreen;


