// AddressListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressListScreen = ({navigation }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressesData = await AsyncStorage.getItem('userAddresses');
        if (addressesData) {
          const parsedAddresses = JSON.parse(addressesData);
          setAddresses(parsedAddresses);
        }
      } catch (error) {
        console.error('Error retrieving addresses:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Addresses</Text>
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.addressContainer}>
            <Text>{item}</Text>
          </View>
        )}
      />
      <Button title="Add Address" onPress={() => navigation.navigate('AddAddress')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  addressContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export default AddressListScreen;
