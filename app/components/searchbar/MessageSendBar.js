import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";

export default function MessageSendBar() {
  const [value, setValue] = useState("");

  return (
    <View style={styles.bar}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setValue(value)}
        value={value}
      />
      {value === "" ? (
        <Icon />
      ) : (
        <Icon
          name="close-circle"
          style={styles.innerIcon}
          onPress={() => setValue("")}
        />
      )}

      <Icon
        style={styles.icon}
        name="paper-plane"
        onPress={() => {
          console.log("Message Sent");
          setValue("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    backgroundColor: "#161616",
    alignItems: "center",
    height: hp(10),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: hp(2),
  },
  input: {
    width: "85%",
    height: hp(5),
    backgroundColor: "#2e2e2e",
    fontSize: 18,
    color: "white",
    borderRadius: hp(5),
    paddingHorizontal: hp(2),
  },
  innerIcon: {
    color: "grey",
    fontSize: 25,
    marginLeft: "-20%",
  },
  icon: {
    marginRight: "1%",
    fontSize: 30,
    color: "white",
  },
});
