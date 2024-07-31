import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icon, MD2Colors } from "react-native-paper";
import { OtpInput } from "react-native-otp-entry";

const Otp = (props) => {
  const source = props.route.params.source;
  const [otp, setOtp] = useState("");

  function maskString(text) {
    if (text.length <= 6) return text; // Handle short strings
    return text.slice(0, 3) + "*".repeat(text.length - 6) + text.slice(-3);
  }

  const nextScreen = async () => {
    try {
      if (otp.length == 4) {
        props.navigation.navigate("CreateNewPassword");
      } else {
        alert("Invalid Otp");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%" }}
    >
      <View
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
            Confirm OTP
          </Text>
        </View>
        <Text
          style={{
            marginTop: 100,
            textAlign: "center",
            fontSize: 20,
            // fontFamily: "Roboto",
          }}
        >
          Code has been sent to{" "}
          <Text style={{ fontWeight: "bold" }}>{maskString(source)}</Text>
        </Text>
        <View style={{ padding: 20, marginTop: 15 }}>
          <OtpInput
            numberOfDigits={4}
            onTextChange={(text) => setOtp(text)}
            focusColor="#e66712"
            theme={{
              focusedPinCodeContainerStyle: {
                backgroundColor: "rgba(230, 103, 18, 0.1)",
              },
              pinCodeContainerStyle: {
                backgroundColor: MD2Colors.grey100,
                // width: 90,
                flex: 1,
                marginHorizontal: 7,
              },
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 13,
          }}
        >
          <Text>
            Resend code in{" "}
            <Text style={{ color: "#e66712", fontWeight: "bold" }}>55</Text>{" "}
            secs
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: "100%",
            padding: 20,
            borderRadius: 360,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e66712",
            marginTop: 45,
          }}
          onPress={() => {
            nextScreen();
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontFamily: "Roboto" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Otp;

const styles = StyleSheet.create({});
