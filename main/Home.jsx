import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon, MD2Colors } from "react-native-paper";
import { productCategories } from "../utils";
import RecommendedStores from "../comps/home/RecommendedStores";
import MostPopular from "../comps/home/MostPopular";

const Home = (props) => {
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.viewStyle,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 45,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Image
              // source={require("../assets/images/img-placeholder.png")}
              source={{
                uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
              }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 360,
                backgroundColor: "black",
              }}
            />
            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                height: 12,
                width: 12,
                borderRadius: 360,
                borderWidth: 2,
                borderColor: "white",
                backgroundColor: "orange",
                zIndex: 1,
              }}
            />
          </View>
          <Text style={{ marginLeft: 8, fontFamily: "Roboto", fontSize: 24 }}>
            Hi, Eben
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Icon source={"bell-outline"} size={29} color={MD2Colors.grey500} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Icon
              source={"heart-outline"}
              size={29}
              color={MD2Colors.grey500}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewStyle}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",

            backgroundColor: MD2Colors.grey100,
            height: 50,
            borderRadius: 15,
            paddingHorizontal: 15,
          }}
        >
          <Pressable
            style={{
              //   width: "90%",
              //   height: "100%",
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Icon source={"magnify"} size={20} color={MD2Colors.grey400} />
            <Text style={{ color: MD2Colors.grey400, marginLeft: 7 }}>
              Search
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: 30,
              height: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Icon
              source={"filter-variant"}
              size={20}
              color={MD2Colors.grey600}
            />
          </Pressable>
        </View>
      </View>

      <View style={[styles.viewStyle]}>
        <Text
          style={{ fontFamily: "Roboto", fontSize: 23, fontWeight: "bold" }}
        >
          Apply for credit
        </Text>

        <Pressable
          style={{
            height: 170,
            width: "100%",
            borderColor: "rgba(41, 98, 192, 0.2)",
            borderWidth: 0.3,
            marginTop: 20,
            borderRadius: 20,
            // overflow: "hidden",
            shadowColor: "rgba(41, 98, 192, 0.5)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.9,
            shadowRadius: 5,
            elevation: 3,
            // overflow
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../assets/images/home-card-bg.jpg")}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "65%",
              zIndex: 1,
              padding: 20,
            }}
          >
            <Icon
              source={"check-decagram-outline"}
              size={35}
              color="rgba(41, 98, 192, 0.5)"
            />
            <Text
              style={{
                marginTop: 11,
                fontSize: 25,
                fontWeight: "bold",
                // fontFamily: "Roboto",
              }}
            >
              Apply for credit
            </Text>
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: 20,
                marginTop: 5,
                color: MD2Colors.grey600,
              }}
            >
              Verify your income to qualify for a credit limit
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 10,
              width: "35%",
              height: "100%",
              zIndex: 1,
              // padding: 20,
            }}
          >
            <Image
              source={require("../assets/images/hero-img.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                // backgroundColor: "black",
              }}
            />
          </View>
        </Pressable>
      </View>

      <View
        style={[
          styles.viewStyle,
          {
            flexDirection: "row",
            flexWrap: "wrap",
            // flex: 1,
            justifyContent: "center",
          },
        ]}
      >
        {productCategories.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.categoryContainer}>
              <View
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 360,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: MD2Colors.grey200,
                }}
              >
                <Icon source={item.icon} size={30} />
              </View>
              <Text
                style={{ marginTop: 8, fontFamily: "Roboto", fontSize: 15 }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <RecommendedStores />
      <MostPopular navigation={props.navigation} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  viewStyle: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  categoryContainer: {
    // flex: 1 / 4,
    width: "25%",
    // margin: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
