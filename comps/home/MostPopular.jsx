import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "../elems/ProductCard";
import { Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { getAllProducts } from "../../utils";

const filters = ["All", "Clothes", "Shoes", "Bags", "Electronics"];

const MostPopular = (props) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllProducts();
      console.log("seller pro", response?.data);
      if (response?.data) {
        setProducts(response?.data);
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getAllProducts();
        console.log("products", response?.data);
        if (response?.data) {
          setProducts(response?.data);
        }
      })();
      return () => {};
    }, [])
  );
  return (
    <View style={{ marginTop: 35 }}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 25,
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontFamily: "Roboto", fontSize: 23, fontWeight: "bold" }}
        >
          Most Popular
        </Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: "row",
          paddingLeft: 20,
          marginTop: 15,
          marginBottom: 10,
        }}
      >
        {filters.map((item, index) => {
          return (
            <Button
              mode={activeFilter == item ? "contained" : "outlined"}
              onPress={() => setActiveFilter(item)}
              style={{ marginRight: 6 }}
              buttonColor={activeFilter == item ? "rgb(41, 98, 192)" : "white"}
              textColor={activeFilter == item ? "white" : "black"}
              key={index}
            >
              {item}
            </Button>
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 20,
          justifyContent: "space-between",
        }}
      >
        {products.map((item, index) => {
          return (
            <ProductCard
              key={index}
              data={item}
              navigation={props.navigation}
            />
          );
        })}
      </View>
    </View>
  );
};

export default MostPopular;

const styles = StyleSheet.create({});
