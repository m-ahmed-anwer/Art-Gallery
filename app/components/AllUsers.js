import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React from "react";
import WorksData from "../data/WorksData";
import { useNavigation } from "@react-navigation/native";

export default function AllUsers() {
  const works = WorksData;
  const navigation = useNavigation();
  //const [like, setLike] = useState(0);
  return (
    <View style={styles.works}>
      <Text style={styles.txt}>Arts Users</Text>
      <View
        style={{
          marginHorizontal: hp(2),
          marginTop: hp(3),
          shadowOffset: { width: 2, height: 2 },
          shadowRadius: 10,
          elevation: 30,
          shadowOpacity: 0.3,
        }}
      >
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={works}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.topBox}
                onPress={() => navigation.navigate("Messages")}
              >
                <View style={styles.firstBox}>
                  <Image
                    source={require("../../assets/profile.jpeg")}
                    style={styles.img}
                  />
                </View>
                <View style={styles.secondBox}>
                  <Text style={styles.name}>Ahmed Anwer</Text>
                  <Text style={styles.message}>Say Hi 👋 !</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          style={styles.flatlist}
          keyExtractor={(category) => {
            category.id;
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  works: {
    justifyContent: "center",
    paddingBottom: hp(13),
    //backgroundColor: "grey",
  },
  txt: {
    fontSize: 23,
    marginLeft: hp(3),
    fontFamily: "Futura",
    fontWeight: "600",
  },
  topBox: {
    height: hp(12),
    marginVertical: 0.5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  firstBox: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: hp(2),
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Hiragino Sans",
    color: "#232e56",
    marginVertical: 5,
  },
  message: {
    fontSize: 15,
    color: "#babfc9",
    marginVertical: 4,
  },
  secondBox: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    height: 85,
    width: 85,
    borderRadius: hp(100),
  },
  flatlist: {
    borderRadius: hp(3),
    marginBottom: hp(5),
    shadowColor: "black",
  },
});
