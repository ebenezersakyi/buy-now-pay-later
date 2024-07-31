import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import { ActivityIndicator, Icon } from "react-native-paper";
import Profile from "./Profile";
import Cart from "./Cart";
import Orders from "./Orders";
import Wallet from "./Wallet";
import { getUserDetailsByEmail } from "../utils";
import { auth } from "../firebaseConfig";
import SellerHome from "./Seller/SellerHome";
import SellerProfile from "./Seller/SellerProfile";
import SellerProducts from "./Seller/SellerProducts";

const Tab = createBottomTabNavigator();

const Main = (props) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    (async () => {
      const userDetailsResponse = await getUserDetailsByEmail(
        auth.currentUser.email
      );
      if (userDetailsResponse?.success == true) {
        setUserDetails(userDetailsResponse?.data);
      }
    })();
  }, []);

  if (userDetails == null) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator animating={true} color={"#2962C0"} size={"large"} />
      </View>
    );
  }

  if (userDetails !== null && userDetails?.role == "Seller") {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        sceneAnimationEnabled={true}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          },
          unmountOnBlur: true,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          children={() => <SellerHome navigation={props.navigation} />}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontFamily: "Roboto" }}>Home</Text>
            ),
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                source={`home${color !== "#2962C0" ? "-outline" : ""}`}
                color={color}
                size={25}
              />
            ),
            tabBarColor: "black",
            tabBarLabelStyle: { color: "black" },
            tabBarActiveTintColor: "#2962C0",
            tabBarInactiveTintColor: "#a3a3a3",
            tabBarShowLabel: true,
          }}
        />
        <Tab.Screen
          name="Products"
          children={() => <SellerProducts navigation={props.navigation} />}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontFamily: "Roboto" }}>Products</Text>
            ),
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                source={`cart${color !== "#2962C0" ? "-outline" : ""}`}
                color={color}
                size={25}
              />
            ),
            tabBarColor: "black",
            tabBarLabelStyle: { color: "black" },
            tabBarActiveTintColor: "#2962C0",
            tabBarInactiveTintColor: "#a3a3a3",
            tabBarShowLabel: true,
          }}
        />
        <Tab.Screen
          name="Profile"
          children={() => <SellerProfile navigation={props.navigation} />}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontFamily: "Roboto" }}>Profile</Text>
            ),
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                source={`account${color !== "#2962C0" ? "-outline" : ""}`}
                color={color}
                size={25}
              />
            ),
            tabBarColor: "black",
            tabBarLabelStyle: { color: "black" },
            tabBarActiveTintColor: "#2962C0",
            tabBarInactiveTintColor: "#a3a3a3",
            tabBarShowLabel: true,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneAnimationEnabled={true}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        },
        unmountOnBlur: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <Home navigation={props.navigation} />}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontFamily: "Roboto" }}>Home</Text>
          ),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              source={`home${color !== "#2962C0" ? "-outline" : ""}`}
              color={color}
              size={25}
            />
          ),
          tabBarColor: "black",
          tabBarLabelStyle: { color: "black" },
          tabBarActiveTintColor: "#2962C0",
          tabBarInactiveTintColor: "#a3a3a3",
          tabBarShowLabel: true,
        }}
      />
      <Tab.Screen
        name="Cart"
        children={() => <Cart navigation={props.navigation} />}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontFamily: "Roboto" }}>Cart</Text>
          ),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              source={`shopping${color !== "#2962C0" ? "-outline" : ""}`}
              color={color}
              size={25}
            />
          ),
          tabBarColor: "black",
          tabBarLabelStyle: { color: "black" },
          tabBarActiveTintColor: "#2962C0",
          tabBarInactiveTintColor: "#a3a3a3",
          tabBarShowLabel: true,
        }}
      />
      <Tab.Screen
        name="Orders"
        children={() => <Orders navigation={props.navigation} />}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontFamily: "Roboto" }}>Orders</Text>
          ),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              source={`cart${color !== "#2962C0" ? "-outline" : ""}`}
              color={color}
              size={25}
            />
          ),
          tabBarColor: "black",
          tabBarLabelStyle: { color: "black" },
          tabBarActiveTintColor: "#2962C0",
          tabBarInactiveTintColor: "#a3a3a3",
          tabBarShowLabel: true,
        }}
      />
      <Tab.Screen
        name="Wallet"
        children={() => <Wallet navigation={props.navigation} />}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontFamily: "Roboto" }}>Wallet</Text>
          ),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              source={`wallet${color !== "#2962C0" ? "-outline" : ""}`}
              color={color}
              size={25}
            />
          ),
          tabBarColor: "black",
          tabBarLabelStyle: { color: "black" },
          tabBarActiveTintColor: "#2962C0",
          tabBarInactiveTintColor: "#a3a3a3",
          tabBarShowLabel: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <Profile navigation={props.navigation} />}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontFamily: "Roboto" }}>Profile</Text>
          ),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              source={`account${color !== "#2962C0" ? "-outline" : ""}`}
              color={color}
              size={25}
            />
          ),
          tabBarColor: "black",
          tabBarLabelStyle: { color: "black" },
          tabBarActiveTintColor: "#2962C0",
          tabBarInactiveTintColor: "#a3a3a3",
          tabBarShowLabel: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
