import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icon, MD2Colors } from "react-native-paper";

const EnterEmail = (props) => {
  const [method, setMethod] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const nextScreen = async () => {
    try {
      let source = "";
      if (method == "SMS") {
        source = phoneNumber;
      } else if (method == "Email") {
        source = email;
      } else {
        alert("Please select a method");
        return;
      }

      props.navigation.navigate("Otp", { source });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%" }}
    >
      <ScrollView
        style={{
          backgroundColor: "white",
          height: "100%",
          padding: 15,
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon source={"arrow-left"} size={30} />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 17,
              fontSize: 25,
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            Forgot Password
          </Text>
        </View>
        <View style={{ height: "40%" }}></View>

        <Text
          style={{ marginVertical: 18, fontSize: 20, color: MD2Colors.grey700 }}
        >
          Select which contact details to use to rest your password
        </Text>

        <Pressable
          style={{
            width: "100%",
            borderRadius: 35,
            borderWidth: method == "SMS" ? 3 : 1,
            borderColor: method == "SMS" ? "#e66712" : MD2Colors.grey200,
            padding: 15,
            flexDirection: "row",
            height: 110,
            marginTop: 20,
          }}
          onPress={() => {
            setMethod("SMS");
            setEmail("");
          }}
        >
          <View
            style={{
              padding: 15,
              height: 80,
              width: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 360,
              backgroundColor: "#f7fcff",
            }}
          >
            <Icon source={"message"} size={30} color="#e66712" />
          </View>
          <View
            style={{ height: "100%", justifyContent: "center", marginLeft: 10 }}
          >
            <Text style={{ color: "grey", fontSize: 13 }}>Via SMS</Text>
            <TextInput
              placeholder="+233 12 123 1234"
              style={{ marginTop: 5, width: "100%", fontSize: 20 }}
              keyboardType="phone-pad"
              editable={method == "SMS"}
              onChangeText={(value) => {
                setPhoneNumber(value);
              }}
              value={phoneNumber}
            />
          </View>
        </Pressable>

        <Pressable
          style={{
            width: "100%",
            borderRadius: 35,
            borderWidth: method == "Email" ? 3 : 1,
            borderColor: method == "Email" ? "#e66712" : MD2Colors.grey200,
            padding: 15,
            flexDirection: "row",
            height: 110,
            marginTop: 20,
          }}
          onPress={() => {
            setMethod("Email");
            setPhoneNumber("");
          }}
        >
          <View
            style={{
              padding: 15,
              height: 80,
              width: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 360,
              backgroundColor: "#f7fcff",
            }}
          >
            <Icon source={"email"} size={30} color="#e66712" />
          </View>
          <View
            style={{ height: "100%", justifyContent: "center", marginLeft: 10 }}
          >
            <Text style={{ color: "grey", fontSize: 13 }}>Via Email</Text>
            <TextInput
              placeholder="john@doe.com"
              style={{ marginTop: 5, width: "100%", fontSize: 20 }}
              keyboardType="email-address"
              editable={method == "Email"}
              onChangeText={(value) => {
                setEmail(value);
              }}
              value={email}
            />
          </View>
        </Pressable>

        <TouchableOpacity
          style={{
            width: "100%",
            padding: 20,
            borderRadius: 360,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e66712",
            marginTop: 30,
          }}
          onPress={() => {
            nextScreen();
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontFamily: "Roboto" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EnterEmail;

const styles = StyleSheet.create({});
