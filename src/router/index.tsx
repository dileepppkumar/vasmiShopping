import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNav from './bottomTabNav';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Root = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown: false}}>
        <Root.Screen component={BottomTabNav} name="HomeTabs" />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
