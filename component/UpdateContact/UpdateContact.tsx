import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../dbObject/db";
import UpdateContactForm from "./UpdateContactForm/UpdateContactForm";

const UpdateContact = ({ id }) => {
  const [contactById, setContactById] = useState(null);

  useEffect(() => {
    getContactById(id);
  }, []);

  const getContactById = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM contacts WHERE id =?",
        [id],
        (_, { rows }) => {
          setContactById(rows._array[0]);
        },
        (_, error) => {
          console.error("Error executing query:", error);
          return true;
        }
      );
    });
  };

  if (!contactById) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }
  return (
    <View>
      <UpdateContactForm contact={contactById} />
    </View>
  );
};

export default UpdateContact;
