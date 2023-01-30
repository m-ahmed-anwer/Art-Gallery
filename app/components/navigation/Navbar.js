import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

function Navbar(props) {
  const navigation = useNavigation();
  const change = {
    shadowColor: "#203239",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.7,
    backgroundColor: "#141E27",
  };

  return (
    <View
      style={[
        styles.bottom,
        Platform.OS === "ios"
          ? { paddingBottom: hp(3), height: hp(12) }
          : { height: hp(11) },
      ]}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.feather, props.type === "Home" && change]}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View style={styles.textView}>
            <Icon
              name="home"
              style={[
                styles.icon,
                props.type == "Home" && { color: "#f1f1f1" },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Home</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.feather, props.type === "Wishlist" && change]}
          onPress={() => {
            navigation.navigate("Wishlist");
          }}
        >
          <View style={styles.textView}>
            <Icon
              name="bookmark"
              style={[
                styles.icon,
                props.type == "Wishlist" && { color: "#f1f1f1" },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={[styles.text]}>Wishlist</Text>
      </View>

      <View style={[styles.container, { marginHorizontal: hp(0.2) }]}>
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
          style={[styles.feather, props.type === "Users" && change]}
          onPress={() => {
            navigation.navigate("Users");
          }}
        >
          <View style={styles.textView}>
            <Icon
              name="mail"
              style={[
                styles.icon,
                props.type == "Users" && { color: "#f1f1f1" },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Messages</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.feather, props.type === "Settings" && change]}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <View style={styles.textView}>
            <Icon
              name="settings"
              style={[
                styles.icon,
                props.type == "Settings" && { color: "#f1f1f1" },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Settings</Text>
      </View>
    </View>
  );
}
export default Navbar;
const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "#f7f7f7",
    borderColor: "#141E27",
    borderWidth: 0.25,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: hp(5),
    borderTopStartRadius: hp(5),
    width: "100%",
    bottom: 0,
  },
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
