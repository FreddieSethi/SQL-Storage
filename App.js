import React from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ItemList from "./components/ItemList";
import DetailsScreen from "./components/DetailsScreen";

import colors from "./config/colors";

// initalises our stack navigator
const Root = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen
          name="Item List"
          component={ItemList}
          options={({ route }) => ({
            title: "ToDo App V1.0",
          })}
        />
        <Root.Screen
          name="Details View"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  title: {
    fontSize: 22,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
});
