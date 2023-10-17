import { FlatList, View, Image, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { styles } from "./List.style";
import { TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
const List = ({ data }) => {
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  1;

  const filterData = (item) => {
    if (searchQuery === "") {
      return (
        <Swipeable renderRightActions={() => rightSwipe(item.id)}>
          <TouchableOpacity
            key={item.id}
            onPress={() => navigate.push(`/update/${item.id}`)}
          >
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.photo_uri }} style={styles.image} />
              <View>
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.mobNumber}>{item.mobile_no}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    }
    if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return (
        <Swipeable renderRightActions={() => rightSwipe(item.id)}>
          <TouchableOpacity
            key={item.id}
            onPress={() => navigate.push(`/update/${item.id}`)}
          >
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.photo_uri }} style={styles.image} />
              <View>
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.mobNumber}>{item.mobile_no}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    }
  };

  const rightSwipe = ({ id }) => {
    return (
      <View style={styles.swipeContainer}>
        <IconButton
          iconColor="black"
          containerColor="#eca1a6"
          icon="delete"
          size={25}
        />
        <IconButton
          iconColor="black"
          icon="application-edit"
          containerColor="#b5e7a0"
          size={25}
        />
      </View>
    );
  };
  return (
    <View style={styles.listContainer}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search Contact"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => filterData(item)}
      />
    </View>
  );
};

export default List;
