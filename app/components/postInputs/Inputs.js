import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import Arts from "../../data/Arts";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../Firebase/Firebase";

export default function Inputs(props) {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("typography");
  const image = props.image;
  const value =
    title === ""
      ? description === ""
        ? true
        : true
      : description === ""
      ? true
      : false;

  const data = Arts.map((item) => {
    return <Picker.Item label={item.name} value={item.type} />;
  });

  const Datasubmit = () => {
    const data = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      userid: firebase.auth().currentUser.uid,
      title,
      description,
      category,
      image,
    };
    firebase
      .database()
      .ref("/post")
      .push(data)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        Alert.alert("Notice", "Successfully your art has been published");
        navigation.navigate("Home");
      });

    setTitle("");
    setDescription("");
    setCategory("typography");
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          value={title}
          onChangeText={(value) => {
            return setTitle(value);
          }}
          placeholder={"Enter title of the post"}
          placeholderTextColor="#7e7e7e"
          keyboardType="default"
          autoCapitalize={true}
          autoCorrect={false}
          style={styles.input}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Category</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
          itemStyle={{ height: 135 }}
          height={200}
        >
          {data}
        </Picker>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          value={description}
          onChangeText={(value) => {
            return setDescription(value);
          }}
          placeholder={"Enter description"}
          placeholderTextColor="#7e7e7e"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect={false}
          multiline={true}
          numberOfLines={4}
          style={[styles.input, { height: hp(10) }]}
        />
      </View>
      <View style={styles.align}>
        <TouchableOpacity
          disabled={value}
          style={[styles.bgBtn, value && { opacity: 0.6 }]}
          onPress={() => {
            Alert.alert("Alert", "Do you want to publish Art", [
              { text: "No", style: "cancel" },
              {
                text: "Yes",
                style: "destructive",
                onPress: () => {
                  Datasubmit();
                },
              },
            ]);
          }}
        >
          <Text style={styles.btn}>Post Art</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: hp("5%"),
  },
  box: {
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
    marginHorizontal: 7,
    color: "#404070",
    fontFamily: "Futura",
  },
  input: {
    marginVertical: hp(1),
    height: hp(5),
    borderRadius: 5,
    fontSize: 15,
    color: "black",
    borderBottomWidth: 1,
    padding: hp(1.3),
    borderBottomColor: "#5f5f5f",
    backgroundColor: "#EDEDED",
  },
  picker: {
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#5f5f5f",
  },

  align: {
    alignItems: "center",
  },
  bgBtn: {
    marginTop: hp(5),
    backgroundColor: "#495381",
    borderRadius: 100,
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
});
