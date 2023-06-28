import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import colors from "../config/colors";

import Swipeable from "react-native-gesture-handler/Swipeable";

const RowCard = ({
  onPress,
  name,
  date,
  id,
  renderRightActions,
}) => {
  let newDate = new Date();
  newDate.setTime(date);
  let dateString = newDate.toUTCString();

  return (
    <Swipeable
      key={id}
      renderRightActions={renderRightActions}
    >
      <TouchableHighlight
        style={styles.rowCard}
        activeOpacity={0.6}
        underlayColor={colors.offWhite}
        onPress={onPress}
      >
        <View style={styles.rowCard}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.subtitleText}>
              Added on {dateString}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rowCard: {
    flexDirection: "row",
    alignContent: "flex-end",
    width: "100%",
    backgroundColor: "dodgerblue",
    marginTop: 5,
    marginBottom: 5,
  },
  titleRow: {
    flexDirection: "column",
    padding: 20,
    justifyContent: "space-between",
  },
  titleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
  },
  subtitleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default RowCard;
