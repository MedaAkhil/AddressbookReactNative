import React from 'react';
import { View, Text, Button } from 'react-native';

const handleAddAddress = () => {
    <Text>address added</Text>
}

const AddressBookScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Address Book Screen</Text>
      <Button title="Add Address" onPress={() => handleAddAddress} />
    </View>
  );
};

export default AddressBookScreen;
