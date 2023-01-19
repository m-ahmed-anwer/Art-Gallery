import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import Arts from "../data/Arts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function MyFriends() {
  const data = Arts;
  const navigation = useNavigation();
  return (
    <View style={styles.top}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
              }}
              onPress={() => navigation.navigate("Messages")}
            >
              <View
                style={[
                  styles.touch,
                  item.id === 1
                    ? { marginLeft: 20, marginRight: 8 }
                    : { marginHorizontal: 8 },
                ]}
              >
                <Image
                  source={require("../../assets/profile.jpeg")}
                  style={styles.img}
                />
              </View>
              <Text style={styles.txt}>Ahmed</Text>
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(category) => {
          category.id;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: hp(19),
  },
  touch: {
    width: hp(9),
    height: hp(9),
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  txt: {
    fontSize: 16,
    marginTop: hp(1.1),
    paddingBottom: hp(1),
    fontFamily: "Avenir",
    fontWeight: "600",
    color: "#232e56",
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: hp(100),
  },
});
