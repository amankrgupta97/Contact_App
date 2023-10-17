import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "./AddContactForm.style";
import { Button, Switch, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { newContactFormValidation } from "../../validation/ContactFormValidation";
import { useRouter } from "expo-router";
import { db } from "../../dbObject/db";

const pickImage = async (setFieldValue) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setFieldValue("photoUri", result.assets[0].uri);
  }
};

const openCamera = async (setFieldValue) => {
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setFieldValue("photoUri", result.assets[0].uri);
  }
};

const AddContactForm = () => {
  const navigate = useRouter();
  const [useLibrary, setUseLibrary] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const initialValues = {
    name: "",
    mobile: "",
    landline: "",
    addToFavorites: false,
    photoUri: null,
  };

  const addContact = (values: {
    name?: string;
    mobile?: string;
    landline?: string;
    addToFavorites?: boolean;
    photoUri?: any;
  }) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO contacts (name, mobile_no, landline_no,favourites ,photo_uri) VALUES (?, ?, ?, ?,?)",
        [
          values.name,
          values.mobile,
          values.landline,
          values.addToFavorites,
          values.photoUri,
        ],
        (_tx, results) => {
          if (results.rowsAffected > 0) {
            alert("New contact added successfully");
          } else {
            alert("Error occured while adding new contact");
          }
        }
      );
    });
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={newContactFormValidation}
        onSubmit={(values) => {
          addContact(values);
          navigate.back();
        }}
      >
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <View>
            <Text style={styles.title}>Add New Contact</Text>
            {values.photoUri && (
              <Image source={{ uri: values.photoUri }} style={styles.image} />
            )}
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="Enter Name"
              value={values.name}
              onChangeText={handleChange("name")}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <TextInput
              style={styles.input}
              mode="outlined"
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              value={values.mobile}
              onChangeText={handleChange("mobile")}
            />
            {errors.mobile && (
              <Text style={styles.errorText}>{errors.mobile}</Text>
            )}
            <TextInput
              style={styles.input}
              mode="outlined"
              placeholder="Enter Landline Number"
              keyboardType="numeric"
              value={values.landline}
              onChangeText={handleChange("landline")}
            />
            {errors.landline && (
              <Text style={styles.errorText}>{errors.landline}</Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text style={styles.favText}>Add to Favorites</Text>
              <Switch
                value={values.addToFavorites}
                onValueChange={() => {
                  setFieldValue("addToFavorites", !values.addToFavorites);
                }}
              />
            </View>

            <View style={styles.imageButtons}>
              <Button
                style={styles.input}
                icon="folder-image"
                mode="contained"
                disabled={useLibrary}
                onPress={() => {
                  setUseCamera(true);
                  pickImage(setFieldValue);
                }}
              >
                Choose photo
              </Button>

              <Button
                style={styles.input}
                icon="camera"
                mode="outlined"
                disabled={useCamera}
                onPress={() => {
                  setUseLibrary(true);
                  openCamera(setFieldValue);
                }}
              >
                Take photo
              </Button>
            </View>
            <Button
              style={styles.input}
              mode="contained"
              onPress={() => handleSubmit()}
            >
              Save
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddContactForm;
