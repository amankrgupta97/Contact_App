import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import {
  Button,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { initDatabase } from "../dbObject/db";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6b5b95",
    secondary: "#f0f0f0",
  },
};

const RootLayout = () => {
  const navigate = useRouter();
  useEffect(() => {
    initDatabase();
  });
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6b5b95",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Contacts",
            headerShown: true,
            headerRight: () => (
              <Button
                icon="account-star"
                mode="elevated"
                onPress={() => navigate.push("/favourite")}
              >
                Fav
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="addNewContact"
          options={{ headerTitle: "Add New Contact", headerShown: true }}
        />

        <Stack.Screen
          name="favourite"
          options={{ headerTitle: "Favourite Contacts", headerShown: true }}
        />
      </Stack>
    </PaperProvider>
  );
};

export default RootLayout;
