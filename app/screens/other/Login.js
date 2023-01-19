import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../Firebase/Firebase";
import { AuthContext } from "../../Navigation/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const height = Dimensions.get("screen").height;
  const [passwordStatus, setPasswordStatus] = useState(true);
  const [status, setStatus] = useState(false);
  const [validity, setValidity] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  const checkError = () => {
    if (!strongRegex.test(email)) {
      setStatus(true);
      setValidity({ ...validity, email: true });
      return;
    } else if (email === "") {
      setStatus(true);
      setValidity({ ...validity, email: true });
      return;
    } else if (password === "") {
      setStatus(true);
      setValidity({ ...validity, password: true });
      return;
    } else if (password.length < 6) {
      setStatus(true);
      setValidity({ ...validity, password: true });
      return;
    }

    loginUser(email, password);
  };

  loginUser = async (email, password) => {
    try {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          setLoading(false);
          alert(error.message);
        })
        .then(() => {
          if (firebase.auth().currentUser) {
            if (firebase.auth().currentUser.emailVerified) {
              setLoading(false);
              login(email, password);
              //navigation.navigate("Home");
            } else {
              setLoading(false);
              firebase.auth().signOut();
              alert(
                `Please verify your account, Verification link send to ${email}`
              );
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
        });
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, height: height }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={loading && { opacity: 0.5 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.bg}
        >
          <StatusBar style="auto" />
          <View style={styles.bg}>
            <View style={styles.top}>
              <Text
                style={styles.back}
                onPress={() => navigation.navigate("Start")}
              >
                <Icon name="arrow-left" style={styles.icon} />
                {`  `}Back
              </Text>

              <Text style={styles.title}>Log In</Text>
            </View>
            <View style={styles.firstCon}>
              <View style={styles.SecondCon}>
                <View style={styles.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.text, { paddingTop: 30 }]}>
                      E-mail
                    </Text>
                    <Text style={styles.danger}>
                      {(validity.email && email === "" && "* Email required") ||
                        (status &&
                          !strongRegex.test(email) &&
                          "* Not valid email")}
                    </Text>
                  </View>

                  <View style={styles.align}>
                    <TextInput
                      placeholder="example@mail.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={styles.input}
                      placeholderTextColor={status ? "#f14f3f" : "#869696"}
                      onChangeText={(value) => {
                        return setEmail(value);
                      }}
                      value={email}
                      onEndEditing={() => {
                        setValidity({ ...validity, email: true });
                      }}
                    />
                  </View>

                  <View style={styles.eye}>
                    <Text style={styles.text}>Password </Text>
                    <Text style={styles.danger}>
                      {validity.password &&
                        password.length < 6 &&
                        "* Minimum 6 chars"}
                    </Text>

                    {passwordStatus ? (
                      <Icon
                        name="eye"
                        style={{
                          color: "white",
                          fontSize: 20,
                          marginRight: hp("9%"),
                        }}
                        onPress={() => {
                          setPasswordStatus(!passwordStatus);
                        }}
                      />
                    ) : (
                      <Icon
                        name="eye-slash"
                        style={{
                          color: "white",
                          fontSize: 20,
                          marginRight: hp("9%"),
                        }}
                        onPress={() => {
                          setPasswordStatus(!passwordStatus);
                        }}
                      />
                    )}
                  </View>

                  <View style={styles.align}>
                    <TextInput
                      keyboardType="default"
                      placeholder="**********"
                      style={styles.input}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      placeholderTextColor={status ? "#f14f3f" : "#869696"}
                      onChangeText={(value) => {
                        return setPassword(value);
                      }}
                      secureTextEntry={passwordStatus}
                      value={password}
                      onEndEditing={() => {
                        setValidity({ ...validity, password: true });
                      }}
                    />
                  </View>

                  <View style={styles.align}>
                    <TouchableOpacity
                      style={styles.bgBtn}
                      onPress={() => {
                        checkError();
                      }}
                    >
                      <Text style={styles.btn}>Log In</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.bottom}>
                    <Text style={styles.redirect}>
                      Don't have an account?{`  `}
                      <Text
                        style={{ color: "white" }}
                        onPress={() => {
                          navigation.navigate("Signup");
                        }}
                      >
                        Signup
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  bg: {
    backgroundColor: "white",
  },
  top: {
    paddingLeft: wp("9%"),
    justifyContent: "center",
    width: wp("60%"),
    borderTopEndRadius: hp(50),
    borderBottomEndRadius: hp(50),
    borderBottomStartRadius: hp(50),
    height: hp(24),
    backgroundColor: "#3A3845",
  },
  back: {
    marginBottom: 10,
    fontSize: 18,
    color: "white",
  },
  icon: {
    fontSize: 18,
  },
  title: {
    paddingLeft: wp("5%"),
    fontSize: 40,
    fontWeight: "600",
    color: "white",
  },
  firstCon: {
    height: "100%",
    backgroundColor: "#EEEDDE",
    borderTopStartRadius: wp(40),
    borderTopEndRadius: hp(25),
    marginTop: 20,
  },
  SecondCon: {
    marginTop: 50,
    height: "100%",
    backgroundColor: "#E0DDAA",
    borderTopStartRadius: hp(100),
    borderTopEndRadius: hp(150),
    zIndex: 2,
  },
  container: {
    marginVertical: 50,
    paddingTop: wp("15%"),
    height: hp("80%"),
    borderTopStartRadius: hp(80),
    borderTopEndRadius: hp(150),
    overflow: "hidden",
    backgroundColor: "#141E27",
  },
  eye: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "700",
    paddingBottom: 10,
    fontSize: 17,
    color: "white",
    marginLeft: "18%",
    justifyContent: "space-between",
  },
  danger: {
    color: "#f14f3f",
    marginHorizontal: 3,
    marginTop: 5,
  },
  input: {
    width: wp("70%"),
    height: 48,
    borderRadius: 10,
    fontSize: 15,
    paddingLeft: 20,
    backgroundColor: "#203239",
    color: "white",
  },
  align: {
    alignItems: "center",
  },
  bgBtn: {
    marginTop: 40,
    backgroundColor: "#40546a",
    borderRadius: 100,
    width: "70%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  bottom: {
    marginVertical: 30,
  },
  redirect: {
    textAlign: "center",
    color: "#6f6f6f",
  },
});
