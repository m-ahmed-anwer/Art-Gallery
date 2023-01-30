import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";

export default function Profile() {
  const navigation = useNavigation();
  const userId = firebase.auth().currentUser.uid;
  const contactNum = "null";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [val, setVal] = useState(false);

  useEffect(() => {
    setVal(true);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((user) => {
        if (user.exists) {
          setEmail(user.data().email);
          setName(user.data().name);
          setUsername(user.data().username);
          setVal(false);
        }
      });
  }, []);

  return (
    <View
      style={val && { flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {val && <ActivityIndicator size="large" color="black" />}
      <View style={[styles.topBackgroung, val && { display: "none" }]}>
        <View style={styles.background}>
          <View style={styles.more}>
            <Icon
              name="chevron-left"
              style={styles.icon}
              onPress={() => {
                navigation.navigate("Settings");
              }}
            />
          </View>

          <View>
            <View style={styles.profile}>
              <Image
                source={require("../../../assets/profile.jpeg")}
                style={styles.img}
              />
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.username}>@{username}</Text>
            </View>

            <View style={styles.bottom}>
              <View style={styles.direction}>
                <Text style={styles.txt1}>User ID</Text>
                <Text style={styles.txt2}>{userId}</Text>
              </View>
              <View style={styles.direction}>
                <Text style={styles.txt1}>User Name</Text>
                <Text style={styles.txt2}>{username}</Text>
              </View>
              <View style={styles.direction}>
                <Text style={styles.txt1}>E-mail</Text>
                <Text style={styles.txt2}>{email}</Text>
              </View>
              <View style={styles.direction}>
                <Text style={styles.txt1}>Contact Number</Text>
                <Text style={styles.txt2}>{contactNum}</Text>
              </View>
            </View>
            <Text
              style={styles.editText}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              Edit Profile{`  `}
              <Icon name="edit" style={styles.edit} />
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topBackgroung: {
    height: hp(18),
    backgroundColor: "#EEEDDE",
    borderBottomEndRadius: hp(9),
    borderBottomStartRadius: hp(10),
  },
  background: {
    backgroundColor: "#E0DDAA",
    height: hp(13),
    borderBottomEndRadius: hp(25),
    borderBottomStartRadius: hp(25),
  },
  more: {
    marginTop: hp(7),
    marginLeft: hp(2),
  },
  icon: {
    fontSize: 28,
    width: 32,
  },
  profile: {
    alignItems: "center",
  },
  img: {
    marginTop: hp(-2.5),
    height: hp(16),
    width: hp(16),
    borderRadius: hp(10),
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 21,
    marginTop: 4,
    color: "#404070",
    fontFamily: "Futura",
  },
  username: {
    fontSize: 15,
    marginTop: 4,
    color: "#5f5f5f",
  },
  direction: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
    paddingBottom: hp(3),
    alignItems: "center",
    marginHorizontal: hp(2),
    justifyContent: "space-between",
  },
  editText: {
    fontSize: 13,
    alignSelf: "flex-end",
    marginHorizontal: hp(3),
    color: "#404070",
    marginVertical: hp(2),
  },
  edit: {
    fontSize: 18,
  },
  bottom: {
    marginTop: 35,
  },
  txt1: {
    fontSize: 18,
    marginHorizontal: 7,
    color: "#404070",
    fontFamily: "Futura",
  },
  txt2: {
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 7,
    color: "#5f5f5f",
    alignSelf: "flex-end",
  },
});
