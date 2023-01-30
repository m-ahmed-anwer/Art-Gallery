import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/navigation/Navbar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-elements";
import { firebase } from "../../Firebase/Firebase";
import { AuthContext } from "../../Navigation/AuthContext";

function Settings() {
  const { signout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const [enable, setEnable] = useState(false);
  const [notification, setNotification] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((user) => {
        if (user.exists) {
          setName(user.data().name);
          setUsername(user.data().username);
          setLoad(false);
        }
      });
  }, []);

  return (
    <>
      <View
        style={
          load
            ? {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }
            : { display: "none" }
        }
      >
        <ActivityIndicator size={"large"} color="black" />
      </View>

      <View style={[styles.cont, load && { display: "none" }]}>
        <ScrollView
          style={styles.scroll}
          vertical
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={{ alignItems: "center" }}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={styles.container}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={require("../../../assets/profile.jpeg")}
                    style={styles.img}
                  />
                </View>
                <View style={styles.names}>
                  <Text style={styles.name}> {name}</Text>
                  <Text style={styles.username}>@ {username}</Text>
                </View>
              </View>
            </View>

            <View style={{ width: "100%" }}>
              <Text style={styles.top}>Account</Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.container2}>
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => navigation.navigate("Profile")}
                  >
                    <View style={styles.boxInner}>
                      <Icon name="user" style={styles.iconInner} />
                      <Text style={styles.text}>Profile</Text>
                    </View>
                    <Icon name="chevron-right" style={styles.icon} />
                  </TouchableOpacity>
                  <View style={styles.border} />
                  <View style={styles.box}>
                    <View style={styles.boxInner}>
                      {notification ? (
                        <Icon name="bell" style={styles.iconInner} />
                      ) : (
                        <Icon name="bell-off" style={styles.iconInner} />
                      )}

                      <Text style={styles.text}>Notification</Text>
                    </View>

                    <Switch
                      value={notification}
                      trackColor={{ false: "#767577", true: "#404070" }}
                      onValueChange={() => setNotification(!notification)}
                    />
                  </View>
                  <View style={styles.border} />
                  <TouchableOpacity style={styles.box}>
                    <View style={styles.boxInner}>
                      <Icon name="globe" style={styles.iconInner} />
                      <Text style={styles.text}>Language</Text>
                    </View>
                    <Text style={{ fontSize: 15, color: "grey" }}>English</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ width: "100%" }}>
              <Text style={styles.top}>Security</Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.container2}>
                  <View style={styles.box}>
                    <View style={styles.boxInner}>
                      {enable ? (
                        <Icon name="lock" style={styles.iconInner} />
                      ) : (
                        <Icon name="unlock" style={styles.iconInner} />
                      )}
                      <Text style={styles.text}>Face ID</Text>
                    </View>
                    <Switch
                      value={enable}
                      trackColor={{ false: "#767577", true: "#404070" }}
                      onValueChange={() => {
                        Alert.alert(
                          `Do you want to ${
                            enable ? `Deactivate` : `Activate`
                          } Face ID`,
                          "",
                          [
                            { text: "Cancel", style: "cancel" },
                            {
                              text: "Yes",
                              style: "destructive",
                              onPress: () => setEnable(!enable),
                            },
                          ]
                        );
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ width: "100%" }}>
              <Text style={styles.top}>About</Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.container2}>
                  <View style={styles.box}>
                    <View style={styles.boxInner}>
                      <Icon name="alert-circle" style={styles.iconInner} />
                      <Text style={styles.text}>Version</Text>
                    </View>
                    <Text style={{ fontSize: 15, color: "grey" }}>2.1.3</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ width: "100%" }}>
              <Text style={styles.top}>Authentication</Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.container2}>
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => {
                      Alert.alert(
                        "Alert !",
                        "Are you sure you want to log out?",
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                          {
                            text: "Log Out",
                            style: "destructive",
                            onPress: () => {
                              firebase
                                .auth()
                                .signOut()
                                .then(() => {
                                  signout();
                                  //navigation.navigate("Start");
                                })
                                .catch((error) => {
                                  console.log(`Error signing out: ${error}`);
                                });
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={[styles.text, { color: "red" }]}>Log Out</Text>
                    <Icon
                      name="log-out"
                      style={[styles.iconInner, { color: "red" }]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <Navbar type={"Settings"} />
      </View>
    </>
  );
}
export default Settings;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scroll: {
    width: "100%",
  },
  container: {
    marginTop: hp(7),
    height: hp(15),
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#404070",
    marginLeft: hp(2),
  },
  names: {
    justifyContent: "center",
    marginLeft: hp(3),
  },
  name: {
    fontSize: 21,
    marginTop: 4,
    color: "#404070",
    fontFamily: "Futura",
  },
  username: {
    fontSize: 15,
    marginTop: 7,
    color: "#5f5f5f",
  },
  top: {
    marginTop: hp(2.5),
    marginBottom: 3,
    fontSize: 15,
    color: "#5c5c5c",
    marginLeft: hp(4),
  },
  container2: {
    marginTop: 5,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  box: {
    flexDirection: "row",
    height: hp(6),
    borderBottomColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hp(2),
  },
  boxInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconInner: {
    fontSize: 22,
    color: "grey",
    marginRight: hp(1.5),
  },
  text: {
    fontSize: 16,
    marginTop: 4,
    color: "#3a3a3a",
    fontFamily: "Futura",
    letterSpacing: 0.1,
  },
  icon: {
    fontSize: 25,
    color: "grey",
  },
  border: {
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 2,
  },

  align: {
    alignItems: "center",
    width: "100%",
  },
  bgBtn: {
    marginTop: hp(3),
    backgroundColor: "#404070",
    borderRadius: 100,
    height: 60,
    width: "50%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: hp(3),
  },
  btn: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
});
