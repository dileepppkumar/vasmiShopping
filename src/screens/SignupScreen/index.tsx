import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  
  
  const handleBack = () => {
    navigation.goBack();
  };
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      return;
    }

    const loginData = {
      email,
      password,
    };

    try {
      await AsyncStorage.setItem('loginData', JSON.stringify(loginData));
      navigation.navigate('signIn'); // Adjust the navigation route as needed
    } catch (error) {
      console.error('Error saving login data to AsyncStorage:', error);
    }

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Clear input fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.login}>
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Signup</Text>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              required
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              required
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setIsPasswordMatch(true); // Reset password match error when typing
              }}
              secureTextEntry
              required
            />
          </View>
          {!isPasswordMatch && <Text style={styles.error}>Passwords do not match!</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.signupLink} onPress={handleBack}>
              Go back
            </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loginContainer: {
    width: 300,
    height: 400,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'black',
    letterSpacing: 3,
    fontWeight: '500',
    marginBottom: 20,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formItem: {
    marginVertical: 6,
  },
  label: {
    color: 'black',
    fontSize: 14,
  },
  input: {
    width: 200,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    padding: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    width: 200,
    height: 40,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#db990b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
  },
  signupLink: {

    color: 'skyblue',
    textAlign:'left',
    padding:10,
    fontSize:18
  },
});

export default SignupScreen;
