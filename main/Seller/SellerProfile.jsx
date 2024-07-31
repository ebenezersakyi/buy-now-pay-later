import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const SellerProfile = () => {
  const { logout } = useAuth();

  const userLogout = () => {
    logout().then((data) => {
      alert("done");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 20,
            borderRadius: 55,
            backgroundColor: "#2962C0",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            userLogout();
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({});
