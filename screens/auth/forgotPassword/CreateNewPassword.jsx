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
} from "react-native-paper";

const CreateNewPassword = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
            Create New Password
          </Text>
        </View>

        <View style={{ height: "30%" }}></View>

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
            Create your password
          </Text>

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
          />
          <TextInput
            label="Re-type password"
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
          />
          {passwordError && (
            <HelperText type="error" visible={passwordError}>
              Password is invalid!
            </HelperText>
          )}

          <View
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
          </View>

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
              // props.navigation.navigate("CreateNewPassword");
            }}
          >
            <Text
              style={{ color: "white", fontSize: 20, fontFamily: "Roboto" }}
            >
              Create password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: MD2Colors.grey100,
    marginTop: 10,
    width: "100%",
    borderRadius: 55,
    // overflow: "hidden",
  },
});
