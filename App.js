import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import AddressListScreen from './AddressListScreen';
import AddAddressScreen from './AddAddressScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated on app start
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        await setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Remove user token and log out
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'AddressList' : 'Login'}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
          name="AddressList"
          component={AddressListScreen}
          options={{
            title: 'Address Book',
            headerRight: () => (
              <Button title="Logout" onPress={handleLogout} />
            ),
          }}
        />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
