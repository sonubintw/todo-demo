import React from 'react';
// import {colors, fonts} from '../theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard/Dashboard';
import { nomenclature } from '../constants/nomenclature';
import { colors } from '../themes/colors';
import { fonts } from '../themes/fonts';
import AddTodoScreen from '../screens/Todo/todo';
import { fontSizes } from '../global/fontSize';


const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={nomenclature.DASHBOARD_SCREEN}
        screenOptions={{
          orientation: 'portrait',
          animation: 'default',
          statusBarBackgroundColor: colors.accent,
          headerTitleStyle: {fontSize: fontSizes.xxl, fontFamily: fonts.bold},
        }}>
        <Stack.Screen name={nomenclature.DASHBOARD_SCREEN} component={Dashboard} />
        <Stack.Screen name={nomenclature.TODO_SCREEN} component={AddTodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
