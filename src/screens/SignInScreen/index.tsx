import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { signIn } from 'aws-amplify/auth';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const user = await signIn(email, password);
      console.log('Logged in successfully!', user);

      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid email or password.');
    }
  };

  return (
    <View style={styles.login}>
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>SignIn</Text>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
              secureTextEntry
              required
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('Signup')}>
              Signup
            </Text>
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
    height: 300,
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
    borderColor: 'white',
    backgroundColor: '#db990b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
  },
  signupText: {
    color: 'black',
    marginTop: 10,
  },
  signupLink: {
    color: 'skyblue',
  },
});

export default SignInScreen;
