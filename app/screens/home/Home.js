import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Navbar from "../../components/navigation/Navbar";
import SearchBar from "../../components/searchbar/Searchbar";
import React, { useState, useCallback } from "react";
import Category from "../../components/Category";
import Works from "../../components/works/Works";
import Icon from "react-native-vector-icons/Feather";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      setType("All");
    });
  }, []);
  const [searchStatus, SetSearchStatus] = useState(false);

  const [type, setType] = useState("All");

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.top}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: hp(6),
            marginHorizontal: hp(4),
          }}
        >
          <Text style={styles.topText}>Art Gallery</Text>
          {searchStatus ? (
            <Icon
              name="x"
              style={styles.icon}
              onPress={() => SetSearchStatus(!searchStatus)}
            />
          ) : (
            <Icon
              name="search"
              style={styles.icon}
              onPress={() => SetSearchStatus(!searchStatus)}
            />
          )}
        </View>
        {searchStatus && <SearchBar placeholder="Search.." />}
      </View>

      <ScrollView
        style={styles.bend}
        vertical
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.txt}>Categories</Text>
        <Category type={type} setType={setType} />

        <Works type={type} />
      </ScrollView>
      <Navbar type={"Home"} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  top: {
    paddingTop: 8,
    backgroundColor: "#EEEDDE",
    width: "100%",
    //height: "25%",
    paddingBottom: 123,
  },
  topText: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "Noteworthy",
  },
  icon: {
    fontSize: 28,
    paddingTop: hp(1),
  },
  bend: {
    backgroundColor: "#fafeff",
    borderTopEndRadius: hp(4),
    borderTopStartRadius: hp(4),
    marginTop: -100,
  },
  load: {
    marginVertical: hp(2),
  },
  txt: {
    fontSize: 23,
    paddingTop: 10,
    marginLeft: hp(3),
    marginTop: 5,
    fontFamily: "Futura",
    fontWeight: "600",
  },
  category: {
    paddingTop: 100,
    width: "100%",
  },
  second: {
    flexDirection: "row",
    marginLeft: hp(2),
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: "grey",
    margin: 10,
    borderRadius: hp(3),
  },
  textCat: { fontSize: 20, marginLeft: hp(5) },
});
