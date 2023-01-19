import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { connect } from "react-redux";

function NavigationIcon(props) {
  const navigation = useNavigation();
  const change = {
    shadowColor: "#203239",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.7,
    backgroundColor: "#141E27",
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.feather, props.press === "Home" && change]}
          onPress={() => {
            props.home();
            navigation.navigate("Home");
          }}
        >
          <View style={styles.textView}>
            <Icon
              name="home"
              style={[
                styles.icon,
                props.press == "Home" && { color: "#f1f1f1" },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Home</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.feather, props.press === "Users" && change]}
          onPress={() => {
            props.users();
            navigation.navigate("Users");
          }}
        >
          <View style={styles.textView}>
            <Icon
              name="mail"
              style={[
                styles.icon,
                props.press == "Users" && { color: "#f1f1f1" },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Messages</Text>
      </View>

      <View style={[styles.container, { marginHorizontal: hp(0.4) }]}>
        <TouchableOpacity
          style={[
            styles.feather,
            {
              marginBottom: hp(9),
              height: 57,
              backgroundColor: "#141E27",
              borderColor: "black",
            },
          ]}
          onPress={() => {
            props.post();
            navigation.navigate("AddPost");
          }}
        >
          <View style={[styles.textView, { borderColor: "black" }]}>
            <Icon
              name="plus"
              style={[styles.icon, { color: "white", fontSize: 40 }]}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.feather, props.press === "Wishlist" && change]}
          onPress={() => {
            props.wishlist();
            navigation.navigate("Wishlist");
          }}
        >
          <View style={styles.textView}>
            <Icon
              name="bookmark"
              style={[
                styles.icon,
                props.press == "Wishlist" && { color: "#f1f1f1" },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={[styles.text]}>Wishlist</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.feather, props.press === "Settings" && change]}
          onPress={() => {
            props.settings();
            navigation.navigate("Settings");
          }}
        >
          <View style={styles.textView}>
            <Icon
              name="settings"
              style={[
                styles.icon,
                props.press == "Settings" && { color: "#f1f1f1" },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Settings</Text>
      </View>
    </>
  );
}
function mapStateToProps(state) {
  return {
    press: state.press,
  };
}
function mapToDispatchToProps(dispatch) {
  return {
    home: () => dispatch({ type: "home" }),
    users: () => dispatch({ type: "users" }),
    post: () => dispatch({ type: "post" }),
    wishlist: () => dispatch({ type: "wishlist" }),
    settings: () => dispatch({ type: "settings" }),
  };
}

export default connect(mapStateToProps, mapToDispatchToProps)(NavigationIcon);
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: hp(1.6),
  },
  textView: {
    alignItems: "center",
  },
  text: {
    marginTop: hp(1),
    fontSize: 12,
    //color: "#f1f1f1",
    color: "#141E27",
    //display: "none",
  },
  icon: {
    fontSize: 24,
    color: "#141E27",
    //backgroundColor: "black",
  },
  feather: {
    marginTop: 7,
    borderRadius: 200,
    borderWidth: 0.8,
    padding: 7,
    backgroundColor: "white",
  },
});
