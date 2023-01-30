import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Inputs from "../../components/postInputs/Inputs";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function AddPost() {
  const navigation = useNavigation();
  const [value, setValue] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topBackground}>
        <StatusBar style="light" />
        <View style={styles.background}>
          <View style={styles.more}>
            <View style={styles.top}>
              <Text style={styles.name}>Publish Art</Text>
            </View>
          </View>
          <Icon
            name="chevron-left"
            style={styles.icon}
            onPress={() => {
              Alert.alert(
                "Alert !",
                "Do you really want to leave page? Data's might be erased",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => navigation.navigate("Home"),
                  },
                ]
              );
            }}
          />
        </View>
      </View>

      <ScrollView
        style={styles.bend}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        vertical
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: "60%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.txt}>Enter Details</Text>
            <TouchableOpacity
              style={[
                styles.imgBox,
                value
                  ? { height: hp(25), width: hp(30) }
                  : { height: hp(20), width: hp(20) },
              ]}
              onPress={() => {
                value === false ? setValue(true) : setValue(true);
              }}
            >
              {value ? (
                <Image
                  source={require("../../../assets/profile.jpeg")}
                  style={{ height: "100%", width: "100%" }}
                />
              ) : (
                <Icon
                  name="add-a-photo"
                  style={{ fontSize: 35, color: "#4f4f4f" }}
                />
              )}
            </TouchableOpacity>
          </View>
          <Inputs image="assets/icon.png" />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  topBackground: {
    height: hp(27),
    backgroundColor: "#203239",
  },
  background: {
    backgroundColor: "#141E27",
    height: hp(11),
    borderBottomEndRadius: hp(25),
    borderBottomStartRadius: hp(25),
  },
  icon: {
    marginLeft: hp(2),
    marginTop: hp(-4.5),
    fontSize: 45,
    color: "white",
    width: hp(6),
  },
  more: {
    marginTop: hp(-2),
    marginLeft: hp(2),
    flexDirection: "row",
    justifyContent: "center",
  },
  top: {
    marginTop: hp(4),
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "Noteworthy",
    color: "white",
    marginTop: hp(4),
  },

  bend: {
    backgroundColor: "#fafeff",
    borderTopEndRadius: hp(4),
    borderTopStartRadius: hp(4),
    marginTop: -105,
  },
  txt: {
    fontSize: 23,
    marginTop: 15,
    fontFamily: "Futura",
    fontWeight: "600",
  },
  imgBox: {
    marginHorizontal: hp(5),
    marginVertical: hp(3),
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
