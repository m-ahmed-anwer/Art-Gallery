import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function EditProfile() {
  const navigation = useNavigation();
  const [name, setName] = useState("Ahmed Anwer");
  const [username, setUsername] = useState("ahmedanwer");
  const userId = "123Dse9";
  const [email, setEmail] = useState("ahmedanwer0094@gmail.com");
  const [contactNum, setContactNum] = useState("0768242884");
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({});
  const height = Dimensions.get("screen").height;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, height: height }}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.background}>
        {status ? (
          <Icon
            name="x"
            style={styles.icon1}
            onPress={() => {
              Alert.alert(
                "Are you Sure?",
                "You will not be able to recover the changes",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      setStatus(false);

                      return navigation.navigate("EditProfile");
                    },
                    style: "destructive",
                  },
                ]
              );
            }}
          />
        ) : (
          <Icon
            name="chevron-left"
            style={styles.icon1}
            onPress={() => navigation.navigate("Profile")}
          />
        )}
        <Text style={styles.editText}>Edit Profile</Text>
        {status ? (
          <Icon
            name="check"
            style={styles.icon1}
            onPress={() => {
              Alert.alert("Do you want to Save Changes", "", [
                {
                  text: "Yes",
                  style: "destructive",
                  onPress: () => {
                    setData(name, username, email, contactNum);
                    return navigation.navigate("Profile");
                  },
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]);
            }}
          />
        ) : (
          <Icon name="edit-3" style={{ fontSize: 27 }} />
        )}
      </View>

      <View style={styles.profile}>
        <Image
          source={require("../../../assets/profile.jpeg")}
          style={styles.img}
        />
        <Icon name="plus-circle" style={styles.plus} onPress={() => {}} />
      </View>

      <View style={styles.bottom}>
        <View style={styles.direction1}>
          <Text style={styles.txt1}>User Name</Text>
          <TextInput
            value={username}
            onChangeText={(value) => {
              return setUsername(value);
            }}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.direction}>
          <Text style={styles.txt1}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={(value) => {
              return setEmail(value);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.direction}>
          <Text style={styles.txt1}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(value) => {
              return setName(value);
            }}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onPressIn={() => setStatus(true)}
          />
        </View>
        <View style={styles.direction}>
          <Text style={styles.txt1}>Phone Number</Text>
          <TextInput
            value={contactNum}
            onChangeText={(value) => {
              return setContactNum(value);
            }}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onPressIn={() => setStatus(true)}
          />
        </View>
        {status && (
          <View style={styles.align}>
            <TouchableOpacity
              style={styles.bgBtn}
              onPress={() => {
                Alert.alert("Do you want to Save Changes", "", [
                  {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                      setData(name, username, email, contactNum);
                      return navigation.navigate("Profile");
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]);
              }}
            >
              <Text style={styles.btn}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#EEEDDE",
    height: hp(16),
    borderBottomEndRadius: hp(25),
    borderBottomStartRadius: hp(25),
    paddingTop: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: hp(2.5),
  },
  editText: {
    fontSize: 24,
    fontFamily: "Futura",
  },
  icon1: {
    fontSize: 30,
  },
  profile: {
    alignItems: "center",
  },
  img: {
    marginTop: hp(-3.5),
    height: hp(16),
    width: hp(16),
    borderRadius: hp(10),
    borderWidth: 2,
    borderColor: "white",
  },
  plus: {
    fontSize: 30,
    color: "#6f6f6f",
    marginLeft: hp(11),
    marginTop: hp(-3),
  },
  bottom: {
    marginTop: hp(5),
  },
  direction1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: hp(2),
  },
  direction: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
    paddingBottom: hp(3),
    alignItems: "center",
    paddingHorizontal: hp(2),
    justifyContent: "space-between",
  },
  input: {
    width: "65%",
    height: hp(4),
    borderRadius: 10,
    fontSize: 15,
    color: "black",
    borderBottomWidth: 1,
    paddingLeft: hp(1),
    borderBottomColor: "#5f5f5f",
  },
  txt1: {
    fontSize: 18,
    color: "#404070",
    fontFamily: "Futura",
    alignSelf: "flex-start",
  },
  align: {
    alignItems: "center",
  },
  bgBtn: {
    marginTop: 40,
    backgroundColor: "#495371",
    borderRadius: 24,
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Futura",
    color: "white",
  },
});
