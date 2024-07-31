import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon, MD2Colors } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

const ProductCard = ({ data, navigation }) => {
  return (
    <Pressable
      style={{
        width: width * 0.5 - 27,
        marginVertical: 15,
      }}
      onPress={() => {
        navigation.navigate("ProductDetails", { productDetails: data });
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "black",
          zIndex: 1,
          height: 30,
          width: 30,
          borderRadius: 360,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon source={"heart-outline"} size={16} color="white" />
      </TouchableOpacity>
      <Image
        source={{
          uri: data.images[0],
        }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "black",
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 7 }}>
        {data.name}
      </Text>
      <View
        style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source={"star"} size={20} color="black" />
          <Text
            style={{ marginLeft: 4, fontSize: 15, color: MD2Colors.grey800 }}
          >
            {data.ratings}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            width: 2,
            backgroundColor: MD2Colors.grey500,
            height: "50%",
          }}
        />
        <View
          style={{
            paddingVertical: 7,
            paddingHorizontal: 10,
            borderRadius: 5,
            backgroundColor: MD2Colors.grey200,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Roboto",
              color: MD2Colors.grey700,
            }}
          >
            0 sold
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 5 }}>
        GH₵ {data.price.toLocaleString()}
      </Text>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
