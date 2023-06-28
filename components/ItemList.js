import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import colors from "../config/colors";
import RowCardFavouriteAction from "./RowCardFavouriteAction";
import RowCard from "./RowCard";
import AppTextInput from "./AppTextInput";
import { sql_database } from "../database/sql_database_controller";

export default function ItemList({ navigation, route }) {
  //this state is used to manage the user input
  const [value, onChangeText] = useState("");
  //the state is used to manage the list data
  const [itemData, setItemData] = useState(null);

  //this is called on submit of the form, or on press of the button
  //calls the addItem function from our database controller and also a new select to update the list
  const addNewItem = () => {
    if (!value) return;
    let date = new Date().getTime();
    sql_database.addItem(value, date);
    sql_database.selectAllItems(setItemData);
    onChangeText("");
  };

  //this is called when the tick is pressed when we swipe left
  const deleteItem = (id) => {
    sql_database.deleteItem(id);
    sql_database.selectAllItems(setItemData);
  };

  //this is called when we tap on a list item, pushes a new view onto the stack
  const exampleOnPress = (item) => {
    navigation.push("Details View", {
      data: item,
      name: item.name,
    });
  };

  //called when we render/mount ItemList for the first time
  useEffect(() => {
    async function setupList() {
      try {
        await sql_database.createDatabase();
        await sql_database.selectAllItems(setItemData);
      } catch (e) {
        console.warn(e);
      }
    }

    setupList();
  }, []);

  return (
    <View style={styles.screen}>
      <AppTextInput
        icon="plus"
        placeholder="Add a new todo"
        value={value}
        onChangeText={(text) => onChangeText(text)}
        onSubmitEditing={addNewItem}
      />
      <FlatList
        style={styles.container}
        data={itemData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <RowCard
            id={item.id}
            name={item.name}
            date={item.date}
            onPress={() => exampleOnPress(item)}
            renderRightActions={() => (
              <RowCardFavouriteAction
                onPress={() => deleteItem(item.id)}
              />
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    height: 60,
    width: "100%",
    borderWidth: 2,
    borderColor: colors.lightWarmGray,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 22,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
});
