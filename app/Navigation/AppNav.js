import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "../../Stack";
import { AppStack } from "../../Stack";
import { AuthContext } from "./AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={"black"} />
    </View>;
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
