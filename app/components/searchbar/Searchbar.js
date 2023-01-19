import { useState, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Searchbar(props) {
  const [val, setVal] = useState("");

  return (
    <View style={{ marginBottom: hp(-2.5), marginHorizontal: hp(1) }}>
      <SearchBar
        placeholder={props.placeholder}
        onChangeText={(newVal) => {
          return setVal(newVal);
        }}
        value={val}
        platform={Platform.OS === "ios" ? "ios" : "android"}
        lightTheme={true}
        showCancel={true}
        style={styles.search}
        focusable={true}
        placeholderTextColor="#5a5a5a"
        inputContainerStyle={{
          borderRadius: 100,
          backgroundColor: "#fafafa",
          height: hp(5),
        }}
        leftIconContainerStyle={{ height: 100 }}
        containerStyle={{ backgroundColor: "#EEEDDE" }}
        keyboardType="default"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  search: {
    color: "black",
    fontSize: 16,
  },
});
