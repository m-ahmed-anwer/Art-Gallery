import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "../../Stack";
import { AppStack } from "../../Stack";
import { AuthContext } from "./AuthContext";
import { ActivityIndicator, Image, View } from "react-native";

export default function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/loading.gif")}
        style={{ height: 400, width: 400 }}
      />
    </View>;
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
