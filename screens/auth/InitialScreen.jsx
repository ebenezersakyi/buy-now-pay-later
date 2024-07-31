import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MD2Colors } from "react-native-paper";

const authOptions = [
  {
    name: "Google",
    icon: require(`../../assets/icons/auth/google.png`),
  },
  {
    name: "Facebook",
    icon: require(`../../assets/icons/auth/facebook.png`),
  },
  {
    name: "Apple",
    icon: require(`../../assets/icons/auth/apple.png`),
  },
];

const InitialScreen = (props) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          height: "30%",
          width: "100%",
          justifyContent: "center",
          // alignItems: "center",
          // paddingLeft: "20%",
        }}
      >
        <Image
          source={require("../../assets/images/app-logo.jpg")}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
        {/* <Image
          source={require("../../assets/brand/bnpl-logo.png")}
          style={{ height: "60%", width: "50%", objectFit: "fill" }}
        /> */}
      </View>

      <View
        style={{
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            // fontFamily: "Inter-Black",
            color: "black",
            fontSize: 45,
            fontWeight: "bold",
            // height: 1000,
          }}
        >
          Let's you in
        </Text>

        <View style={{ marginTop: 25, width: "100%" }}>
          {authOptions?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  padding: 10,
                  width: "100%",
                  borderColor: MD2Colors.grey300,
                  borderWidth: 0.5,
                  borderRadius: 17,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <Image
                  source={item.icon}
                  style={{ height: 30, width: 30, backgroundColor: "white" }}
                />
                <Text
                  style={{ marginLeft: 15, fontSize: 17, fontFamily: "Roboto" }}
                >
                  Continue with {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // width: "90%",
            alignItems: "center",
            marginVertical: 26,
          }}
        >
          <View
            style={{
              borderWidth: 0.5,
              borderColor: MD2Colors.grey300,
              width: "100%",
            }}
          />
          <Text
            style={{ marginHorizontal: 10, fontSize: 20, fontFamily: "Roboto" }}
          >
            or
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: MD2Colors.grey300,
              width: "100%",
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            width: "100%",
            padding: 20,
            borderRadius: 360,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2962C0",
            // marginTop: 20,
          }}
          onPress={() => {
            props.navigation.navigate("PasswordSignIn");
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontFamily: "Roboto" }}>
            Sign in with password
          </Text>
        </TouchableOpacity>

        <View
          style={{ flexDirection: "row", marginTop: 16, alignItems: "center" }}
        >
          <Text style={{ fontSize: 17, color: "grey", fontFamily: "Roboto" }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
            <Text
              style={{ fontSize: 17, color: "#2962C0", fontFamily: "Roboto" }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({});
