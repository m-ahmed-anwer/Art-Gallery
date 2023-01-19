import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Description from "../../components/Description";
import Category from "../../components/Category";

export default function Describe() {
  const navigation = useNavigation();
  const route = useRoute();
  const { image, title, user, type, likes, description } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBackground}>
        <StatusBar style="light" />
        <View style={styles.background}>
          <View style={styles.top}>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Icon
                name="chevron-left"
                style={[styles.icon, { flex: 1 }]}
                onPress={() => navigation.navigate("Home")}
              />
              <Text style={[styles.name, { flex: 1.6 }]}>Home</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.messages}
        vertical
        showsVerticalScrollIndicator={false}
      >
        <Description
          image={image}
          title={title}
          user={user}
          type={type}
          likes={likes}
          description={description}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: hp(7), marginTop: hp(3) }}
        >
          <Category />
        </ScrollView>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  topBackground: {
    height: hp(17),
    backgroundColor: "#203239",
  },
  background: {
    backgroundColor: "#141E27",
    height: hp(12),
    borderBottomEndRadius: hp(25),
    borderBottomStartRadius: hp(25),
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(7),
    width: "100%",
  },
  name: {
    fontSize: 23,
    color: "white",
    fontWeight: "600",
  },
  icon: {
    fontSize: 40,
    color: "#73aed7",
    marginLeft: hp(2),
  },
});
