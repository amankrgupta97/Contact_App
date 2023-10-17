import { View, FlatList, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { styles } from "./FavList.styles";

const FavList = ({ data }) => {
  const navigate = useRouter();
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
        )}
      />
    </View>
  );
};

export default FavList;
