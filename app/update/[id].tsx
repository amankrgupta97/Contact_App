import { View } from "react-native";
import React from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import UpdateContact from "../../component/UpdateContact/UpdateContact";

const UpdateContactScreen = () => {
  const { id } = useGlobalSearchParams();
  return (
    <View>
      <Stack.Screen
        options={{ headerTitle: "Update Contact", headerShown: true }}
      />
      <UpdateContact id={id} />
    </View>
  );
};

export default UpdateContactScreen;
