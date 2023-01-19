import Login from "./app/screens/other/Login";
import Signup from "./app/screens/other/Signup";
import Start from "./app/screens/other/Start";
import Profile from "./app/screens/other/Profile";
import EditProfile from "./app/screens/other/EditProfile";
import Messages from "./app/screens/other/Messages";
import Describe from "./app/screens/other/Describe";

import AddPost from "./app/screens/home/AddPost";
import Users from "./app/screens/home/Users";
import Settings from "./app/screens/home/Settings";
import Home from "./app/screens/home/Home";
import Wishlist from "./app/screens/home/Wishlist";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Start"
        component={Start}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Users"
        component={Users}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Describe"
        component={Describe}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { AppStack, AuthStack };
