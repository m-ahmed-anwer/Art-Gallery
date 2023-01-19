import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import Arts from "../data/Arts";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Category(props) {
  const data = Arts;
  const type = props.type;
  const setType = props.setType;

  return (
    <View style={styles.top}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setType(item.name)}
            >
              <View
                style={[
                  styles.container,
                  index === 0 ? { marginLeft: 18 } : { marginLeft: 9 },
                  type === item.name
                    ? { backgroundColor: "#b9b9b9" }
                    : { backgroundColor: "white" },
                ]}
              >
                <View>
                  <Image source={item.url} style={styles.img} />
                </View>
                <Text style={styles.title}>{item.name}</Text>
              </View>
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
  container: {
    width: 130,
    height: 130,
    borderRadius: 25,
    marginVertical: 25,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 30,
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 14,
    paddingTop: 6,
    fontWeight: "bold",
  },
  img: {
    height: 85,
    width: 100,
    borderRadius: 20,
  },
});
