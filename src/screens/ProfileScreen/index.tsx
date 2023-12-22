// ProfileComponent.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { signOut,currentAuthenticatedUser,forgotPassword } from 'aws-amplify/auth';

const ProfileComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const authenticatedUser = await currentAuthenticatedUser();
      setUser(authenticatedUser);
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(user.attributes.email);
      Alert.alert('Password Reset', 'A password reset code has been sent to your email.');
    } catch (error) {
      console.error('Error initiating password reset:', error);
      Alert.alert('Error', 'Failed to initiate password reset. Please try again.');
    }
  };

  return (
    <View>
      {user ? (
        <View>
          <Text>Welcome, {user.username}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Text>You are not logged in.</Text>
          <Button title="Login" onPress={() => navigation.navigate('SignIn')} />
        </View>
      )}
      <Button title="Forgot Password" onPress={handleForgotPassword} />
    </View>
  );
};

export default ProfileComponent;
