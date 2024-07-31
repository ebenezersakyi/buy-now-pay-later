import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Checkbox,
  HelperText,
  Icon,
  MD2Colors,
  TextInput,
  ToggleButton,
} from "react-native-paper";
import { saveUserData } from "../../utils";
import { useAuth } from "../../contexts/AuthContext";

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

const SignUp = (props) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [accountType, setAccountType] = useState("Buyer");
  const [registering, setRegistering] = useState(false);

  const userRegister = async () => {
    setRegistering(true);
    if (email.length == 0 || !email.includes("@")) {
      // setEmailError(true);
      setRegistering(false);
      return;
    }
    if (password.length < 6) {
      // setPasswordError(true);
      setRegistering(false);
      return;
    }

    // const profilePicture = await imageUpload(image, email);
    saveUserData(email, accountType)
      .then((data) => {
        if (data?.success == true) {
          signup(email, password);
          setRegistering(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setRegistering(false);
      });
    setRegistering(false);
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
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 35,
            left: 10,
            // paddingHorizontal: 15,
            zIndex: 2,
          }}
          onPress={() => {
            props.navigation.goBack();
            // alert("hello");
          }}
        >
          <Icon source={"arrow-left"} size={35} color="grey" />
        </TouchableOpacity>

        <View style={{ height: "30%" }}>
          <Image
            source={require("../../assets/images/app-logo.jpg")}
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
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
              fontSize: 40,
              fontWeight: "bold",
              // height: 1000,
            }}
          >
            Create new account
          </Text>

          <View
            style={{
              height: 50,
              marginTop: 15,
              flexDirection: "row",
              backgroundColor: "white",
              borderRadius: 30,
              width: "100%",
              borderWidth: 0.3,
              borderColor: MD2Colors.grey500,
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                padding: 10,
                borderRadius: 30,
                backgroundColor:
                  accountType == "Buyer" ? "rgb(41, 98, 192)" : "white",
                width: "50%",
                alignItems: "center",
                height: "100%",
              }}
              onPress={() => {
                setAccountType("Buyer");
              }}
            >
              <Text
                style={{
                  color: accountType == "Buyer" ? "white" : "black",
                  fontSize: 15,
                }}
              >
                Buyer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                padding: 10,
                borderRadius: 30,
                backgroundColor:
                  accountType == "Seller" ? "rgb(41, 98, 192)" : "white",
                width: "50%",
                alignItems: "center",
                height: "100%",
              }}
              onPress={() => {
                setAccountType("Seller");
              }}
            >
              <Text
                style={{
                  color: accountType == "Seller" ? "white" : "black",
                  fontSize: 15,
                }}
              >
                Seller
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            label="Email Address"
            error={emailError}
            left={<TextInput.Icon icon="email" color={MD2Colors.grey400} />}
            mode="outlined"
            style={styles.textInput}
            value={email}
            onChangeText={(email) => setEmail(email)}
            keyboardType="email-address"
            outlineColor={"transparent"}
            activeOutlineColor="black"
            autoCapitalize="none"
          />
          {emailError && (
            <HelperText type="error" visible={emailError}>
              Email address is invalid!
            </HelperText>
          )}

          <TextInput
            label="Password"
            secureTextEntry={isSecureTextEntry}
            error={passwordError}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  setIsSecureTextEntry(!isSecureTextEntry);
                }}
                color={MD2Colors.grey400}
              />
            }
            mode="outlined"
            left={<TextInput.Icon icon="lock" color={MD2Colors.grey400} />}
            style={styles.textInput}
            outlineColor={"transparent"}
            activeOutlineColor="black"
            value={password}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
          />
          {passwordError && (
            <HelperText type="error" visible={passwordError}>
              Password is invalid!
            </HelperText>
          )}

          {/* <View
            style={{
              flexDirection: "row",
              marginTop: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Checkbox.Android
              status={rememberMe ? "checked" : "unchecked"}
              onPress={() => {
                setRememberMe(!rememberMe);
              }}
              uncheckedColor="grey"
              color={"black"}
            />
            <Text style={{ marginLeft: 3, letterSpacing: 1 }}>Remeber me</Text>
          </View> */}

          <TouchableOpacity
            style={{
              width: "100%",
              padding: 20,
              borderRadius: 360,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(41, 98, 192)",
              marginTop: 30,
            }}
            onPress={() => {
              // props.navigation.navigate("Main");
              userRegister();
            }}
          >
            <Text
              style={{ color: "white", fontSize: 20, fontFamily: "Roboto" }}
            >
              Sign up
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ marginVertical: 20 }}>
            <Text style={{ color: "#e66712", fontWeight: "bold" }}>
              Forgot password?
            </Text>
          </TouchableOpacity> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // width: "90%",
              alignItems: "center",
              marginTop: 20,
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
              style={{
                marginHorizontal: 10,
                fontSize: 17,
                fontFamily: "Roboto",
                color: "grey",
              }}
            >
              or continue with
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: MD2Colors.grey300,
                width: "100%",
              }}
            />
          </View>

          <View style={{ marginVertical: 20, flexDirection: "row" }}>
            {authOptions?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 15,
                    borderWidth: 0.5,
                    borderColor: MD2Colors.grey300,
                    marginHorizontal: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Image
                    source={item?.icon}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 17, color: "grey", fontFamily: "Roboto" }}>
              Alreafy have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("PasswordSignIn");
              }}
              disabled={registering}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "rgb(41, 98, 192)",
                  fontFamily: "Roboto",
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: MD2Colors.grey100,
    marginTop: 10,
    width: "100%",
    borderRadius: 55,
    // overflow: "hidden",
  },
});
