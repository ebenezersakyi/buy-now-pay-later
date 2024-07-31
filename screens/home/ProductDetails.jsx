import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Button, Icon, MD2Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetails = (props) => {
  const addToCart = async (product) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      console.log("cart", cart);
      if (cart) {
        let parsedCart = JSON.parse(cart);
        await parsedCart.push(product);
        await AsyncStorage.setItem("cart", JSON.stringify(parsedCart));
        console.log("Added to cart");
      } else {
        await AsyncStorage.setItem("cart", JSON.stringify([product]));
        console.log("Added to cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const productDetails = props.route.params.productDetails;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <Image
          source={{ uri: productDetails.images[0] }}
          style={{ width: "100%", height: 320, backgroundColor: "black" }}
        />
        <View style={{ paddingHorizontal: 18, paddingTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                // fontFamily: "Roboto",
                marginTop: 10,
                fontWeight: "bold",
                width: "70%",
              }}
              numberOfLines={1}
            >
              {productDetails.name}
            </Text>
            <TouchableOpacity>
              <Icon
                source={"heart-outline"}
                size={25}
                color={MD2Colors.grey600}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 9,
              borderBottomColor: MD2Colors.grey300,
              borderBottomWidth: 0.5,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                paddingVertical: 7,
                paddingHorizontal: 10,
                borderRadius: 8,
                backgroundColor: MD2Colors.grey200,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  // fontFamily: "Roboto",
                  fontWeight: "bold",
                  color: MD2Colors.grey700,
                }}
              >
                0 sold
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <Icon source={"star"} size={19} color="black" />
              <Text
                style={{
                  marginLeft: 4,
                  fontSize: 15,
                  color: MD2Colors.grey800,
                }}
              >
                {productDetails?.ratings} ({productDetails?.reviews} reviews)
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 18 }}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: MD2Colors.grey700,
                }}
              >
                Description
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto",
                  marginTop: 5,
                  color: MD2Colors.grey600,
                }}
              >
                {productDetails?.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          padding: 15,
          paddingHorizontal: 20,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 2 / 5 }}>
          <Text style={{ fontSize: 12, color: MD2Colors.grey400 }}>
            Total price
          </Text>
          <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 10 }}>
            GHS {productDetails?.price}
          </Text>
        </View>
        <View style={{ flex: 3 / 5, paddingHorizontal: 10 }}>
          <Button
            icon="cart"
            mode="contained"
            onPress={() => {
              addToCart(productDetails);
            }}
            contentStyle={{
              height: 55,
            }}
            style={{
              borderRadius: 360,
              backgroundColor: "rgb(41, 98, 192)",
            }}
          >
            Add to cart
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
