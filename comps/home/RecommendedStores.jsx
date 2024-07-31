import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

const RecommendedStores = () => {
  const StoreCard = () => {
    const tags = ["Mattress", "Couch", "Wardrope"];
    return (
      <Pressable
        style={{
          width: width - 30,
          height: 180,
          marginHorizontal: 15,
          borderRadius: 20,
          overflow: "hidden",
          marginTop: 20,
        }}
      >
        <Image
          source={{
            uri: "https://m.media-amazon.com/images/I/81jQNSQRSgL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
          }}
          style={{ width: "100%", height: "100%", backgroundColor: "black" }}
        />
        <View
          style={{
            zIndex: 1,
            backgroundColor: "black",
            position: "absolute",
            top: 10,
            right: 10,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYpZTqpk8d0Ppla01lkZiJtrk_-2A8NDlIf2FYwbc66g&s",
            }}
            style={{
              height: 40,
              width: 70,
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            // flexDirection: "row",
          }}
        >
          <View
            style={{
              shadowColor: "#ccc",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                color: "white",
                marginBottom: 5,
                fontWeight: "bold",
              }}
            >
              ASHFOAM
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {tags?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: "#2962C0",
                    padding: 7,
                    borderRadius: 11,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "white",
                      fontFamily: "Roboto",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ marginTop: 30 }}>
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
          Recommended stores
        </Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flexDirection: "row" }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {[1, 2, 3, 4, 5, 6].map((item, index) => {
          return <StoreCard key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default RecommendedStores;

const styles = StyleSheet.create({});
