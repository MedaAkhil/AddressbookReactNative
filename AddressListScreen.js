import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getAddresses = async () => {
    try {
      const addressData = await AsyncStorage.getItem('userAddress');
      if (addressData) {
        const addresses = JSON.parse(addressData);
        return addresses;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving addresses:', error);
      return null;
    }
  };
const AddressListScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const savedAddresses = await getAddresses();
      if (savedAddresses) {
        setAddresses(savedAddresses);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
        <Button title="reload" onPress={getAddresses} />
      <Text style={styles.header}>Saved Addresses</Text>
      {renderAddresses(addresses)}
      <Button title="add address" onPress={()=>navigation.navigate("AddAddress")}></Button>
    </View>
  );
};

const renderAddresses = (addresses) => {
  const addressComponents = [];

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    addressComponents.push(
      <View key={i} style={styles.addressContainer}>
        <Text>Address {i + 1}:</Text>
        <Text>{address.address1}</Text>
        <Text>{address.address2}</Text>
        <Text>{address.address3}</Text>
        <Text>{address.address4}</Text>
      </View>
    );
    
  }

  return addressComponents;
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
    marginBottom: 20,
  },
});

export default AddressListScreen;
