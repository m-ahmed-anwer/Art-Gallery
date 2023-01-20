import { View, Text, StyleSheet, FlatList } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React from "react";
import WorksData from "../../data/WorksData";
import WorksProps from "./WorksProps";

function Works(props) {
  const type = props.type;
  const works = WorksData;

  return (
    <View style={styles.works}>
      <Text style={styles.txt}>Works</Text>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={works}
        renderItem={({ item }) => {
          while (type === "All") {
            return (
              <WorksProps
                url={item.url}
                title={item.title}
                user={item.user}
                type={item.type}
                likes={item.likes}
                description={item.description}
              />
            );
          }
          while (type === item.type) {
            return (
              <WorksProps
                url={item.url}
                title={item.title}
                user={item.user}
                type={item.type}
                likes={item.likes}
                description={item.description}
              />
            );
          }
        }}
        style={styles.flatlist}
        keyExtractor={(category) => {
          category.id;
        }}
      />
    </View>
  );
}

export default Works;
const styles = StyleSheet.create({
  works: {
    justifyContent: "center",
    paddingBottom: hp(13),
  },
  txt: {
    fontSize: 23,
    marginLeft: hp(3),
    fontFamily: "Futura",
    fontWeight: "600",
    marginVertical: hp(1),
  },
  flatlist: {
    marginVertical: hp(1),
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
});
