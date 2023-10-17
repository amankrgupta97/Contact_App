import { ScrollView, Text, Image, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Switch, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../../dbObject/db";
import { newContactFormValidation } from "../../../validation/ContactFormValidation";
import { styles } from "./UpdateContactForm.style";
import { useRouter } from "expo-router";

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

const UpdateContactForm = ({ contact }) => {
  const [useLibrary, setUseLibrary] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const navigate = useRouter();

  const initialValues = {
    name: contact["name"],
    mobile: contact["mobile_no"],
    landline: contact["landline_no"],
    addToFavorites: contact["favourites"],
    photoUri: contact["photo_uri"],
  };

  const updateContact = (values: {
    name?: string;
    mobile?: string;
    landline?: string;
    addToFavorites?: boolean;
    photoUri?: any;
  }) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE contacts SET name=?, mobile_no=?, landline_no=?, favourites=?, photo_uri=? WHERE id=?",
        [
          values.name,
          values.mobile,
          values.landline,
          values.addToFavorites,
          values.photoUri,
          contact["id"],
        ],
        (_tx, results) => {
          if (results.rowsAffected > 0) {
            alert("contact Updated successfully");
          } else {
            alert("Error occured while Updating contact");
          }
        }
      );
    });
  };

  const deleteContact = (id) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM contacts WHERE id=?", [id], (_tx, results) => {
        if (results.rowsAffected > 0) {
          alert("contact deleted successfully");
          navigate.back();
        } else {
          alert("Error occured while deleting contact");
        }
      });
    });
  };
  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        validationSchema={newContactFormValidation}
        onSubmit={(values) => {
          updateContact(values);
          navigate.back();
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <View>
            <Text style={styles.title}>Update Contact</Text>
            {values.photoUri && (
              <Image source={{ uri: values.photoUri }} style={styles.image} />
            )}
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange("name")}
            />

            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="Mobile Phone Number"
              keyboardType="numeric"
              value={values.mobile}
              onChangeText={handleChange("mobile")}
            />
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="Landline Number"
              keyboardType="numeric"
              value={values.landline}
              onChangeText={handleChange("landline")}
            />
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
                Change photo
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

      <Button
        style={styles.input}
        icon="delete"
        mode="outlined"
        onPress={() => deleteContact(contact["id"])}
      >
        Delete
      </Button>
    </ScrollView>
  );
};

export default UpdateContactForm;
