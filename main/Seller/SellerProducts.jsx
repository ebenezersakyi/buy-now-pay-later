import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { IconButton, MD2Colors } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { getSellerProducts } from "../../utils";
import { useFocusEffect } from "@react-navigation/native";
import ProductCard from "../../comps/elems/ProductCard";

const SellerProducts = (props) => {
  const { userDetails } = useAuth();
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getSellerProducts(userDetails?._id);
      console.log("seller pro", response?.data);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getSellerProducts(userDetails?._id);
        console.log("seller pro", response?.data);
        if (response?.data) {
          setSellerProducts(response?.data);
        }
      })();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Text>SellerProducts</Text> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 40,
            fontWeight: "bold",
            color: "black",
          }}
          numberOfLines={1}
        >
          Products
        </Text>
        <IconButton
          icon="plus"
          mode="contained"
          iconColor={MD2Colors.white}
          size={20}
          style={{ backgroundColor: "black" }}
          onPress={() => props.navigation.navigate("CreateProduct")}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 20,
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        {sellerProducts.map((item, index) => {
          return (
            <ProductCard
              key={index}
              data={item}
              navigation={props.navigation}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default SellerProducts;

const styles = StyleSheet.create({});
