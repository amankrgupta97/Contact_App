import { useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { styles } from "./AddContactButton.style";

const AddContactButton = () => {
  const navigation = useRouter();
  return (
    <View style={styles.container}>
      <Button
        style={styles.addbutton}
        icon="account-plus"
        mode="contained"
        onPress={() => navigation.push("/addNewContact")}
      >
        Add
      </Button>
    </View>
  );
};

export default AddContactButton;
