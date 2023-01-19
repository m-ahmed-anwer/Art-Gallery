import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Description(props) {
  const [value, setValue] = useState(false);
  //const [likes, setLikes] = useState(2);
  const { image, title, user, type, likes, description } = props;
  const [countLike, setCountLike] = useState(likes);

  return (
    <View style={styles.top}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{ width: "90%", height: 300 }}
          onPress={() => {}}
        >
          <Image source={image} style={styles.img} />
        </TouchableOpacity>
      </View>
      <Text style={styles.category}>{type}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.title, { width: "60%" }]}>{title}</Text>
        <View style={{ alignItems: "center" }}>
          <Icon
            name="heart"
            style={[
              styles.icon,
              value ? { color: "#fb3958" } : { color: "grey" },
            ]}
            onPress={() => {
              setValue(!value);
              {
                value === true && setCountLike(likes + 1);
              }
            }}
          />
          <Text style={{ marginTop: 15 }}>
            {countLike} Like{likes > 1 ? `s` : ``}
          </Text>
        </View>
      </View>
      <Text style={styles.descrption}>{description}</Text>

      <View style={styles.box}>
        <Image
          source={require("../../assets/profile.jpeg")}
          style={styles.profile}
        />
        <View style={{ marginHorizontal: hp(2) }}>
          <Text style={styles.name}>Ahmed</Text>
          <Text style={styles.followers}>2K Followers</Text>
        </View>
      </View>

      <View>
        <Text style={styles.interest}>You may also Interested in :</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    paddingTop: hp(3),
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
  },
  category: {
    marginHorizontal: hp(2),
    marginVertical: hp(1.5),
    fontSize: 17,
    color: "grey",
  },
  title: {
    fontSize: 35,
    fontFamily: "Menlo",
    fontWeight: "600",
    letterSpacing: 2,
    marginHorizontal: hp(2),
    marginVertical: hp(1),
  },
  icon: {
    fontSize: 32,
    marginHorizontal: hp(5),
  },
  descrption: {
    fontSize: 18,
    color: "#494949",
    fontFamily: "Arial",
    margin: hp(2),
    lineHeight: 25,
  },
  interest: {
    fontSize: 21,
    margin: hp(2),
    marginTop: hp(4),
    fontFamily: "Symbol",
  },
  box: {
    marginTop: hp(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1fa",
    borderRadius: hp(3),
    width: "60%",
  },
  profile: {
    margin: hp(1),
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  name: {
    fontSize: 18,
    marginVertical: 5,
  },
  followers: {
    marginVertical: 5,
    fontSize: 15,
  },
});
