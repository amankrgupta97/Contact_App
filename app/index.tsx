import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import AddContactButton from "../component/ContactList/AddContactButton/AddContactButton";
import ContactList from "../component/ContactList/ContactList";
import { styles } from "../component/ContactList/ContactList.style";

const ContactListScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.heading} variant="headlineMedium">
        Contact List
      </Text>
      <ContactList />
      <View>
        <AddContactButton />
      </View>
    </View>
  );
};

export default ContactListScreen;
