/* eslint-disable prettier/prettier */

import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './src/router/bottomTabNav';

import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import SignUpScreen from './src/screens/SignupScreen';
import ConfirmSignUpScreen from './src/screens/ConfirmSignupScreen';
import SignInScreen from './src/screens/SignInScreen';
import ProfileComponent from './src/screens/ProfileScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import OrderPlacedScreen from './src/screens/OrderPlacedScreen';
import ResetScreen from './src/screens/ResetScreen';
import {LocalShoppingCartProvider} from './context';
Amplify.configure(amplifyconfig);

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState(null);

  const handleSignIn = userData => {
    setUser(userData);
  };
  console.log(user);

  return (
    <LocalShoppingCartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="signIn" component={SignInScreen} />

          <Stack.Screen
            name="Profile"
            component={ProfileComponent}
            initialParams={{user}}
          />
          <Stack.Screen name="HomeTabs" component={BottomTabNav} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen} />
          <Stack.Screen name="payment" component={PaymentScreen} />
          <Stack.Screen name="orderPlaced" component={OrderPlacedScreen} />
          <Stack.Screen name="ResetScreen" component={ResetScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocalShoppingCartProvider>
  );
}

export default App;
