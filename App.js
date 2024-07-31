import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useCallback, useEffect, useState } from "react";
import InitialScreen from "./screens/auth/InitialScreen";
import { useFonts } from "expo-font";
import PasswordSignIn from "./screens/auth/PasswordSignIn";
import SignUp from "./screens/auth/SignUp";
import EnterEmail from "./screens/auth/forgotPassword/EnterEmail";
import Otp from "./screens/auth/forgotPassword/Otp";
import CreateNewPassword from "./screens/auth/forgotPassword/CreateNewPassword";
import Main from "./main";
import ProductDetails from "./screens/home/ProductDetails";
import CreateProduct from "./screens/vendor/CreateProduct";
import { PaperProvider } from "react-native-paper";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./contexts/AuthContext";

const Stack = createStackNavigator();

export default function App(props) {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    OpenSans: require("./assets/fonts/OpenSans.ttf"),
    TitilliumWeb: require("./assets/fonts/TitilliumWeb.ttf"),
    Montserrat: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
    });
  }, []);

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  if (!loggedIn) {
    return (
      <PaperProvider>
        <NavigationContainer>
          <AuthProvider>
            <Stack.Navigator initialRouteName="InitialScreen">
              <Stack.Screen
                name="InitialScreen"
                component={InitialScreen}
                options={{ headerShown: false }}
                navigation={props.navigation}
              />
              <Stack.Screen
                name="PasswordSignIn"
                component={PasswordSignIn}
                options={{ headerShown: false }}
                navigation={props.navigation}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
                navigation={props.navigation}
              />
              <Stack.Screen
                name="EnterEmail"
                component={EnterEmail}
                options={{ headerShown: false }}
                navigation={props.navigation}
              />
              <Stack.Screen
                name="Otp"
                component={Otp}
                options={{ headerShown: false }}
                navigation={props.navigation}
              />
              <Stack.Screen
                name="CreateNewPassword"
                component={CreateNewPassword}
                options={{ headerShown: false }}
                navigation={props.navigation}
              />
            </Stack.Navigator>
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateProduct"
              component={CreateProduct}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
