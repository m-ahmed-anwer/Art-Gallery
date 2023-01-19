import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../Firebase/Firebase";

export default function Login() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(true);
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [validity, setValidity] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);

  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );

  signupUser = async (email, password, name) => {
    setLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://arts-ae3f6.firebaseapp.com/",
          })
          .then(() => {
            alert("Email verification link send to " + email);
          })
          .catch((error) => {
            setLoading(false);
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                name,
                email,
              });
          })
          .catch((error) => {
            setLoading(false);
            alert(error.message);
          });
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
    setLoading(false);
    navigation.navigate("Login");
  };

  const checkError = () => {
    if (name.length < 3) {
      setStatus(true);
      setValidity({ ...validity, name: true });
      return;
    } else if (email === "") {
      setStatus(true);
      setValidity({ ...validity, email: true });
      return;
    } else if (!strongRegex.test(email)) {
      setStatus(true);
      setValidity({ ...validity, email: true });
      return;
    } else if (password.length < 6) {
      setValidity({ ...validity, password: true });
      setStatus(true);
      return;
    } else if (password !== confirmpassword) {
      setStatus(true);
      return;
    }
    signupUser(email, password, name);
  };

  const height = Dimensions.get("screen").height;
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, height: height }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={loading && { opacity: 0.5 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
        style={styles.bg}
      >
        <StatusBar style="auto" />
        <View style={styles.top}>
          <Text
            style={styles.back}
            onPress={() => navigation.navigate("Start")}
          >
            <Icon name="arrow-left" style={styles.icon} />
            {`  `}Back
          </Text>

          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.text, { paddingTop: 20 }]}>Name</Text>
            <Text style={styles.danger}>
              {validity.name &&
                ((name === "" && "* Name required") ||
                  (name.length < 3 && "* Enter valid name"))}
            </Text>
          </View>

          <View style={styles.align}>
            <TextInput
              placeholder="Jhon"
              autoCapitalize="true"
              autoCorrect={false}
              keyboardType="default"
              style={styles.input}
              placeholderTextColor={status ? "#f14f3f" : "#869696"}
              onChangeText={(value) => {
                setName(value);
              }}
              onEndEditing={() => {
                setValidity({ ...validity, name: true });
              }}
              value={name}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.text, { paddingTop: 20 }]}>E-mail</Text>
            <Text style={styles.danger}>
              {(validity.email && email === "" && "* Email required") ||
                (status && !strongRegex.test(email) && "* Not valid email")}
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
                setEmail(value);
              }}
              onEndEditing={() => {
                setValidity({ ...validity, email: true });
              }}
              value={email}
            />
          </View>

          <View style={styles.eye}>
            <Text style={styles.text}>Password </Text>

            {passwordStatus ? (
              <Icon
                name="eye"
                style={{
                  color: "white",
                  fontSize: 20,
                  marginRight: hp("9.5%"),
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
                  marginRight: hp("9.5%"),
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
              autoCapitalize={"none"}
              autoCorrect={false}
              textContentType="password"
              style={styles.input}
              placeholderTextColor={status ? "#f14f3f" : "#869696"}
              onChangeText={(value) => {
                setPassword(value);
              }}
              secureTextEntry={passwordStatus}
              value={password}
              onEndEditing={() => {
                setValidity({ ...validity, password: true });
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.text, { paddingTop: 20 }]}>
              Confirm Password
            </Text>
            <Text style={styles.danger}>
              {validity.password &&
                (password !== confirmpassword
                  ? "* Password not match"
                  : password.length < 6 && "* Minimum 6 characters")}
            </Text>
          </View>
          <View style={styles.align}>
            <TextInput
              keyboardType="default"
              placeholder="**********"
              autoCapitalize={"none"}
              autoCorrect={false}
              textContentType="password"
              style={styles.input}
              placeholderTextColor={status ? "#f14f3f" : "#869696"}
              onChangeText={(value) => {
                return setConfirmpassword(value);
              }}
              secureTextEntry={passwordStatus}
              value={confirmpassword}
              onEndEditing={() => {
                setValidity({ ...validity, password: true });
              }}
            />
          </View>

          <View style={styles.align}>
            <TouchableOpacity
              style={styles.bgBtn}
              onPress={() => {
                //setData({
                //  name: name,
                //  email: email,
                //  password: password,
                //  confirmpassword: confirmpassword,
                //});
                checkError();
              }}
            >
              <Text style={styles.btn}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.redirect}>
              Already have an account?{`  `}
              <Text
                style={{ color: "white" }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
  align: {
    alignItems: "center",
  },
  container: {
    marginVertical: 20,
    paddingTop: wp("8%"),
    height: hp("80%"),
    borderTopStartRadius: hp(80),
    borderTopEndRadius: hp(110),
    overflow: "hidden",
    backgroundColor: "#141E27",
  },
  eye: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "700",
    paddingBottom: 10,
    fontSize: 17,
    color: "white",
    marginLeft: "18%",
  },

  danger: {
    color: "#f14f3f",
    marginHorizontal: 7,
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
  bgBtn: {
    marginTop: 35,
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
