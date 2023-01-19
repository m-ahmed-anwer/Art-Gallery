import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { firebase } from "../Firebase/Firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        setUserInfo(firebase.auth().currentUser);
        setUserToken(firebase.auth().currentUser.uid);
        AsyncStorage.setItem(
          "userInfo",
          JSON.stringify(firebase.auth().currentUser)
        );
        AsyncStorage.setItem("userToken", firebase.auth().currentUser.uid);
      });
    setIsLoading(false);
  };
  const signout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = AsyncStorage.getItem("userInfo");
      let userToken = AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, signout, isLoading, userToken, userInfo }}
    >
      {children}
      <Text></Text>
    </AuthContext.Provider>
  );
};
