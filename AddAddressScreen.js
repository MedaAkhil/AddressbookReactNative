import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddressScreen = ({ navigation }) => {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [address4, setAddress4] = useState('');

  const saveAddress = async () => {
    try {
      const addressData = {
        address1,
        address2,
        address3,
        address4,
      };
      await AsyncStorage.setItem('userAddress', JSON.stringify(addressData));
      setAddress1("")
      setAddress2("")
      setAddress3("")
      setAddress4("")
      // You can add more logic here, like showing a success message.
      // Navigate to another screen or perform any additional actions.
    } catch (error) {
      console.error('Error saving address:', error);
      // Handle error, e.g., show an error message to the user.
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Address 1"
        value={address1}
        onChangeText={setAddress1}
      />
      <TextInput
        style={styles.input}
        placeholder="Address 2"
        value={address2}
        onChangeText={setAddress2}
      />
      <TextInput
        style={styles.input}
        placeholder="Address 3"
        value={address3}
        onChangeText={setAddress3}
      />
      <TextInput
        style={styles.input}
        placeholder="Address 4"
        value={address4}
        onChangeText={setAddress4}
      />
      <Button title="Save Address" onPress={saveAddress} />
      <Button title="Saved Address" onPress={()=>navigation.navigate('AddressList')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AddAddressScreen;
