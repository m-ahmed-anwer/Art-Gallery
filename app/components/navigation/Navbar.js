import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import NavigationIcon from "./NavigationIcon";

function Navbar(props) {
  const initialState = {
    press: "",
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "home":
        return { press: "Home" };
      case "users":
        return { press: "Users" };
      case "post":
        return { press: "Home" };
      case "wishlist":
        return { press: "Wishlist" };
      case "settings":
        return { press: "Settings" };
    }
    return state;
  };
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <View
        style={[
          styles.bottom,
          Platform.OS === "ios"
            ? { paddingBottom: hp(3), height: hp(12) }
            : { height: hp(11) },
        ]}
      >
        <NavigationIcon />
      </View>
    </Provider>
  );
}
export default Navbar;
const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "#f7f7f7",
    borderColor: "#141E27",
    borderWidth: 0.8,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: hp(5),
    borderTopStartRadius: hp(5),
    width: "100%",
    bottom: 0,
  },
});
