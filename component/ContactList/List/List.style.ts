import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  mobNumber: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  },
  searchBox: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },

  swipeContainer: {
    flexDirection: "row",
  },

  swiperDelButton: {
    tintColor: "white",
  },
});
