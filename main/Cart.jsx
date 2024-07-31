import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { IconButton, MD2Colors } from "react-native-paper";
import { Paystack } from "react-native-paystack-webview";
import { auth } from "../firebaseConfig";

const Cart = (props) => {
  const [cart, setCart] = useState(null);
  const [unSortedCart, setUnSortedCart] = useState(null);
  const navigation = useNavigation();
  const paystackWebViewRef = useRef();

  const getCartItems = async () => {
    try {
      const cart = await AsyncStorage.getItem("cart");

      if (cart) {
        const parsed = JSON.parse(cart);

        const sort = () => {
          const cartItems = {};
          parsed.forEach((product) => {
            const productId = product._id;

            if (cartItems[productId]) {
              cartItems[productId].quantity++;
            } else {
              cartItems[productId] = { ...product, quantity: 1 };
            }
          });

          console.log("cartItems", cartItems);
          return Object.values(cartItems);
        };

        setCart(sort());
        setUnSortedCart(parsed);
        // console.log(parsed);
      } else {
        setCart(null);
        setUnSortedCart(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      console.log("cart", cart);
      if (cart) {
        let parsedCart = JSON.parse(cart);
        await parsedCart.push(product);
        await AsyncStorage.setItem("cart", JSON.stringify(parsedCart));
        getCartItems();
        console.log("Added to cart");
      } else {
        await AsyncStorage.setItem("cart", JSON.stringify([product]));
        getCartItems();
        console.log("Added to cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      console.log("cart", cart);
      if (cart) {
        let parsedCart = JSON.parse(cart);
        let indexToRemove = parsedCart.findIndex((item) => {
          return item.id == product.id;
        });
        console.log("indexToRemove,", parsedCart);
        console.log("product,", product);
        if (indexToRemove !== -1) {
          parsedCart.splice(indexToRemove, 1);
        }
        await AsyncStorage.setItem("cart", JSON.stringify(parsedCart));
        getCartItems();
        console.log("Added to cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getCartItems();
      })();
      return () => {};
    }, [])
  );

  const totalPrice = unSortedCart?.reduce((accumulator, product) => {
    // Convert the price to a number and add it to the accumulator
    return accumulator + parseFloat(product.price);
  }, 0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Paystack
        paystackKey={"pk_test_344e58dfe938efd0479aa493792f7f7a0d800042"}
        billingEmail={auth.currentUser.email}
        amount={totalPrice}
        currency="GHS"
        activityIndicatorColor="white"
        channels={["mobile_money", "card"]}
        onCancel={(e) => {}}
        onSuccess={(res) => {
          props.navigation.goBack();
        }}
        ref={paystackWebViewRef}
      />
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          padding: 15,
        }}
        style={{ flex: 1 }}
      >
        {cart?.map((item, index) => {
          console.log("product", item);
          return (
            <View
              key={index}
              style={{
                width: "100%",
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                // marginVertical: 5,
                borderBottomColor: MD2Colors.grey300,
                borderBottomWidth: 0.5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: item.images[0],
                  }}
                  style={{
                    height: 90,
                    width: 90,
                    backgroundColor: "black",
                    borderRadius: 20,
                  }}
                />
                <View style={{ marginLeft: 10, justifyContent: "center" }}>
                  <Text style={{ fontSize: 23, marginTop: 0 }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{ fontSize: 15, marginTop: 3 }}
                    numberOfLines={1}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 3 }}
                  >
                    GHS {item?.price?.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: 110,
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  icon="minus"
                  mode="contained"
                  iconColor={MD2Colors.white}
                  size={12}
                  style={{ backgroundColor: "black" }}
                  onPress={() => {
                    removeFromCart(item);
                  }}
                />
                <Text>{item.quantity}</Text>
                <IconButton
                  icon="plus"
                  mode="contained"
                  iconColor={MD2Colors.white}
                  size={12}
                  style={{ backgroundColor: "black" }}
                  onPress={() => {
                    addToCart(item);
                  }}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          padding: 20,
          paddingHorizontal: 35,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          GHS {totalPrice?.toLocaleString()}
        </Text>
        <TouchableOpacity
          style={{
            padding: 15,
            paddingHorizontal: 25,
            borderRadius: 35,
            backgroundColor: "#2962C0",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            paystackWebViewRef.current.startTransaction();
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
