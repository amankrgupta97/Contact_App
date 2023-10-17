import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("contact.db");

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,mobile_no TEXT,landline_no TEXT,favourites BOOLEAN,photo_uri TEXT)"
    );
  });
};
