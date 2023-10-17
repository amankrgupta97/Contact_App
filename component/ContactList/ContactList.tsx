import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../dbObject/db";
import List from "./List/List";

const ContactList = () => {
  const [contacts, setContacts] = useState(null);
  useEffect(() => {
    getAllContacts();
  }, [contacts]);

  const getAllContacts = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM contacts ORDER BY name ASC",
        [],
        (_, { rows }) => {
          setContacts(rows._array);
        },
        (_, error) => {
          console.error("Error executing query:", error);
          return true;
        }
      );
    });
  };

  // if (contacts === null) {
  //   return (
  //     <View>
  //       <Text variant="titleMedium">Empty Space </Text>
  //     </View>
  //   );
  // }
  return (
    <View style={{ flex: 1 }}>
      <List data={contacts} />
    </View>
  );
};

export default ContactList;
