import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MessageSendBar from "../../components/searchbar/MessageSendBar";

export default function Profile() {
  const navigation = useNavigation();
  const name = "Ahmed Anwer";

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBackground}>
        <StatusBar style="light" />
        <View style={styles.background}>
          <View style={styles.more}>
            <View style={styles.top}>
              <Image
                source={require("../../../assets/profile.jpeg")}
                style={styles.img}
              />
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
          <Icon
            name="chevron-left"
            style={styles.icon}
            onPress={() => navigation.navigate("Users")}
          />
        </View>
      </View>
      <ScrollView
        style={styles.messages}
        vertical
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: hp(50), backgroundColor: "grey" }}>
          <Text>Hello</Text>
        </View>
        <View style={{ height: hp(50), backgroundColor: "lavender" }}>
          <Text>Hello</Text>
        </View>
      </ScrollView>
      <MessageSendBar />
    </View>
  );
}
const styles = StyleSheet.create({
  topBackground: {
    height: hp(17),
    backgroundColor: "#203239",
  },
  background: {
    backgroundColor: "#141E27",
    height: hp(12),
    borderBottomEndRadius: hp(25),
    borderBottomStartRadius: hp(25),
  },
  icon: {
    marginTop: hp(-6.5),
    marginLeft: hp(3),
    fontSize: 40,
    color: "#73aed7",
    width: hp(6),
  },
  more: {
    marginTop: hp(6),
    marginLeft: hp(2),
    flexDirection: "row",
    justifyContent: "center",
  },
  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 0.3,
    borderColor: "white",
    marginLeft: hp(3),
  },
  name: {
    fontSize: 20,
    marginHorizontal: hp(2),
    color: "white",
    fontWeight: "600",
  },
  messages: {
    zIndex: -1,
  },
});
