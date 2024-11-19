import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { auth, db } from '../services/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHints, setPasswordHints] = useState([]);

  const checkPasswordStrength = (password) => {
    const hints = [];
    if (password.length < 8) hints.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) hints.push('One uppercase letter');
    if (!/[a-z]/.test(password)) hints.push('One lowercase letter');
    if (!/\d/.test(password)) hints.push('One number');
    setPasswordHints(hints);
    return hints.length === 0;
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!checkPasswordStrength(password)) {
      Alert.alert('Weak Password', 'Please fix the following:\n• ' + passwordHints.join('\n• '));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        displayName: displayName,
        profileImage: 'https://placedog.net/301/301', // Default profile image
        bio: '',
        postsCount: 0,
        eventsCount: 0,
        createdAt: new Date(),
      });

      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            checkPasswordStrength(text);
          }}
          secureTextEntry
        />

        {passwordHints.length > 0 && password.length > 0 && (
          <View style={styles.hintsContainer}>
            {passwordHints.map((hint, index) => (
              <Text key={index} style={styles.hintText}>
                • {hint}
              </Text>
            ))}
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FF6B6B',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  signupLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  signupLinkText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginLinkText: {
    color: '#666',
    fontSize: 14,
  },
  hintsContainer: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  hintText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginBottom: 3,
  },
});

export default SignupScreen;