import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;

export default function WorksProps(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.topBox}
      onPress={() =>
        navigation.navigate("Describe", {
          image: props.url,
          title: props.title,
          user: props.user,
          type: props.type,
          likes: props.likes,
          description: props.description,
        })
      }
    >
      <View style={styles.firstBox}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.user}>{props.user}</Text>

        <Text style={styles.iconText}>
          <Icon name="heart" style={styles.icon} />
          {`  `}
          {props.likes}
        </Text>
      </View>

      <View style={styles.secondBox}>
        <Image source={props.url} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topBox: {
    flex: 1,
    height: 165,
    borderRadius: 20,
    marginHorizontal: hp(3),
    marginVertical: hp(1.5),
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 7,
  },
  firstBox: {
    width: "40%",
    marginHorizontal: hp(1.8),
    flex: 1,
  },
  title: {
    fontSize: 18,
    paddingTop: "22%",
    paddingVertical: "5%",
    fontWeight: "700",
    fontFamily: "Hiragino Sans",
    color: "#232e56",
  },
  user: {
    fontSize: 15,
    paddingVertical: "5%",
    color: "#babfc9",
  },
  secondBox: {
    flex: 1,
    marginRight: hp(2),
    marginVertical: 20,
  },
  img: {
    height: "100%",
    width: "auto",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    fontSize: 20,
    color: "#fb3958",
  },
  iconText: {
    fontSize: 15,
    color: "#232e56",
    marginTop: 5,
  },
});
