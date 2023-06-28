import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";

export default function DetailsScreen({
  navigation,
  route,
}) {
  const item = route.params.data;
  const { name, date } = item;

  //this coverts out unix timestamp number into a human readable date
  let newDate = new Date();
  newDate.setTime(date);
  let dateString = newDate.toUTCString();

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>
        This ToDo was created on {dateString}
      </Text>
      <Button
        title="Go back"
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  text: {
    padding: 20,
    fontSize: 25,
  },
});
