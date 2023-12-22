
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { updatePassword } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';

const UpdatePasswordComponent = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation()

  const handleUpdatePassword = async () => {
    try {
      await updatePassword({ oldPassword, newPassword });
      Alert.alert('Password Updated', 'Your password has been successfully updated.');
      navigation.navigator(-1)
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Failed to update password. Please check your old password and try again.');
    }
  };



  return (
    <View>
      <Text>Update Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 }}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Update Password" onPress={handleUpdatePassword} />

     
    </View>
  );
};

export default UpdatePasswordComponent;
