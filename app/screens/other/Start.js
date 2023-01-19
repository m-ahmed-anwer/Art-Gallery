import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
export default function Start() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#fcfcfd" }}>
      <StatusBar style="auto" />
      <View style={styles.top}>
        <Text style={styles.title1}>ART</Text>
        <Text style={styles.title2}>at</Text>
        <Text style={styles.title3}>WORK</Text>
      </View>

      <View style={styles.firstCon}>
        <View style={styles.SecondCon}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.bgBtn1}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.btn1}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bgBtn2}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.btn2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(20),
    justifyContent: "center",
  },
  title1: {
    fontSize: 50,
    fontWeight: "600",
    fontFamily: "Hiragino Sans",
  },
  title2: {
    fontSize: 40,
    fontWeight: "500",
    fontFamily: "Futura",
  },
  title3: {
    marginLeft: -30,
    fontSize: 40,
    transform: [{ rotate: "-90deg" }],
    fontWeight: "600",
    fontFamily: "Noteworthy",
  },
  firstCon: {
    height: "100%",
    backgroundColor: "#EEEDDE",
    borderTopEndRadius: hp(25),
    borderTopStartRadius: hp(25),
    marginTop: 100,
  },
  SecondCon: {
    marginTop: 70,
    height: "100%",
    backgroundColor: "#E0DDAA",
    borderTopEndRadius: hp(20),
    borderTopStartRadius: hp(20),
  },
  container: {
    marginVertical: 65,
    paddingTop: hp(8),
    borderTopEndRadius: hp(15),
    borderTopStartRadius: hp(15),
    height: "100%",
    backgroundColor: "#141E27",
    alignItems: "center",
  },
  bgBtn1: {
    marginTop: 40,
    backgroundColor: "#495371",
    borderRadius: 100,
    width: "50%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btn1: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  bgBtn2: {
    marginTop: 40,
    borderColor: "#495371",
    borderWidth: 3,
    borderRadius: 100,
    width: "50%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
});
