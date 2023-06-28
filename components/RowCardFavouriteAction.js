import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function RowCardFavouriteAction(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <View>
        <MaterialIcons
          name="done"
          size={45}
          color={"green"}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RowCardFavouriteAction;
