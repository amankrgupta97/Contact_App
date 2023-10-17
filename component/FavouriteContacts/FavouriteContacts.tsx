import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../dbObject/db";
import List from "../ContactList/List/List";
import FavList from "./FavList/FavList";

const FavouriteContacts = () => {
  const [favcontacts, setFavContacts] = useState([]);

  useEffect(() => {
    getFavContacts();
  }, [favcontacts]);

  const getFavContacts = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM contacts WHERE favourites= ? ORDER BY name ASC",
        [1],
        (_, { rows }) => {
          setFavContacts(rows._array);
        },
        (_, error) => {
          console.error("Error executing query:", error);
          return true;
        }
      );
    });
  };

  return (
    <View>
      <FavList data={favcontacts}></FavList>
    </View>
  );
};

export default FavouriteContacts;
