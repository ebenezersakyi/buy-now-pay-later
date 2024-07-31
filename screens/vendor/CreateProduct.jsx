import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useMemo, useState } from "react";
import {
  Button,
  Divider,
  Icon,
  MD2Colors,
  Menu,
  TextInput,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";
import axios from "axios";
import { imageUpload } from "../../utils";
import { API_URL } from "@env";
import { useAuth } from "../../contexts/AuthContext";

const { width, height } = Dimensions.get("screen");

const CreateProduct = () => {
  const { userDetails } = useAuth();
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSizesModal, setShowSizesModal] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [size, setSize] = useState("");
  const [qty, setQty] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //   setImages((prev) => [...prev, result.assets[0].uri]);
      setImages((prev) => [...prev, result.assets[0]]);
    }
  };

  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex);
    setSelectedColor(hex);
  };

  const coloSelected = () => {
    if (selectedColor && !colors.some((item) => item == selectedColor)) {
      setColors((prev) => [...prev, selectedColor]);
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  const ColorSelectorPortal = useMemo(() => {
    return (
      <Modal visible={showModal} animationType="slide" style={{}} transparent>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        >
          <ColorPicker
            style={{ width: "70%" }}
            value="red"
            onComplete={onSelectColor}
          >
            <Preview />
            <Panel1 />
            <HueSlider />
            {/* <OpacitySlider /> */}
            <Swatches />
          </ColorPicker>

          <Button
            icon="check"
            mode="contained"
            onPress={() => {
              coloSelected();
            }}
            contentStyle={{
              height: 55,
            }}
            style={{
              borderRadius: 360,
              backgroundColor: "rgb(41, 98, 192)",
              marginTop: 20,
            }}
          >
            Done
          </Button>
        </View>
      </Modal>
    );
  }, [showModal, colors]);

  const add = () => {
    if (size && qty) {
      setSizes((prev) => [...prev, { size: size, quantity: qty }]);
      setSize("");
      setQty("");
      setShowSizesModal(false);
    }
  };

  const SizesPortal = useMemo(() => {
    return (
      <Modal
        visible={showSizesModal}
        animationType="slide"
        style={{}}
        transparent
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(255,255,255)",
            padding: 20,
          }}
        >
          <TextInput
            mode="outlined"
            label="Size"
            placeholder=""
            outlineColor={"transparent"}
            activeOutlineColor="black"
            style={styles.textInput}
            // numberOfLines={6}
            // multiline
            keyboardType="default"
            value={size}
            // right={<TextInput.Affix text="/100" />}
            onChangeText={(value) => setSize(value)}
          />
          <TextInput
            mode="outlined"
            label="Quantity"
            placeholder=""
            outlineColor={"transparent"}
            activeOutlineColor="black"
            style={styles.textInput}
            keyboardType="number-pad"
            // right={<TextInput.Affix text="/100" />}
            onChangeText={(value) => setQty(value)}
            value={qty}
          />

          <Button
            icon="check"
            mode="contained"
            onPress={() => {
              add();
            }}
            contentStyle={{
              height: 55,
            }}
            style={{
              borderRadius: 360,
              backgroundColor: "rgb(41, 98, 192)",
              marginTop: 20,
            }}
          >
            Done
          </Button>
        </View>
      </Modal>
    );
  }, [showSizesModal, sizes, size, qty]);

  const createProduct = async () => {
    try {
      if (!userDetails) {
        alert("Error");
        return;
      }
      const uploadPromises = images.map((image) => imageUpload(image));
      const urls = await Promise.all(uploadPromises);

      const response = await axios.post(`${API_URL}product/products`, {
        name: name,
        description: description,
        price: price,
        category: category,
        stock: totalQuantity,
        sizes: sizes,
        images: urls,
        user: userDetails?._id,
      });

      const data = response?.data;
      console.log("productzzz", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%", height: "100%" }}
    >
      {ColorSelectorPortal}
      {SizesPortal}
      <ScrollView
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 15 }}
      >
        <SafeAreaView>
          <View>
            <ScrollView
              horizontal
              style={{
                paddingTop: 15,
                flexDirection: "row",
              }}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={{
                  //   padding: 15,
                  borderRadius: 20,
                  backgroundColor: MD2Colors.grey200,
                  justifyContent: "center",
                  alignItems: "center",
                  width: width * 0.2,
                  height: 80,
                  marginLeft: 15,
                }}
                onPress={() => {
                  pickImage();
                }}
              >
                <Icon source={"camera-plus-outline"} size={25} />
              </TouchableOpacity>
              {images?.map((item, index) => {
                return (
                  <View key={index} style={{ margin: 5 }}>
                    <Image
                      source={{ uri: item.uri }}
                      style={{
                        borderRadius: 20,
                        backgroundColor: MD2Colors.grey300,

                        width: width * 0.2,
                        height: 80,
                      }}
                    />
                  </View>
                );
              })}
            </ScrollView>

            <View
              style={{
                marginTop: 30,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ScrollView
                style={{ marginTop: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  style={{
                    height: 45,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: MD2Colors.grey200,
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    marginRight: 15,
                  }}
                  onPress={() => setShowModal(true)}
                >
                  <Icon source={"plus"} size={20} />
                  <Text style={{ marginLeft: 5, fontSize: 16 }}>
                    Product Color
                  </Text>
                </TouchableOpacity>
                {colors?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        margin: 5,
                        backgroundColor: item,
                        height: 43,
                        width: 43,
                        borderRadius: 360,
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>

            <View
              style={{
                marginTop: 10,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ScrollView
                style={{ marginTop: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  style={{
                    height: 45,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: MD2Colors.grey200,
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    marginRight: 15,
                  }}
                  onPress={() => setShowSizesModal(true)}
                >
                  <Icon source={"plus"} size={20} />
                  <Text style={{ marginLeft: 5, fontSize: 16 }}>Size</Text>
                </TouchableOpacity>
                {sizes?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        margin: 5,
                        // backgroundColor: item,
                        // height: 43,
                        padding: 5,
                        paddingHorizontal: 15,
                        // width: 43,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "black",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item?.size}
                      </Text>
                      <Text
                        style={{ color: "white", fontSize: 12, marginTop: 3 }}
                      >
                        {item?.quantity} qty
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>

            <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
              <TextInput
                mode="outlined"
                label="Product Name"
                placeholder=""
                outlineColor={"transparent"}
                activeOutlineColor="black"
                style={styles.textInput}
                // right={<TextInput.Affix text="/100" />}
                onChangeText={(value) => setName(value)}
              />
              <TextInput
                mode="outlined"
                label="Price"
                placeholder=""
                outlineColor={"transparent"}
                activeOutlineColor="black"
                style={styles.textInput}
                keyboardType="numeric"
                // right={<TextInput.Affix text="/100" />}
                onChangeText={(value) => setPrice(value)}
              />
              <TextInput
                mode="outlined"
                label="Quantity"
                placeholder=""
                outlineColor={"transparent"}
                activeOutlineColor="black"
                style={styles.textInput}
                keyboardType="number-pad"
                // right={<TextInput.Affix text="/100" />}
                onChangeText={(value) => setTotalQuantity(value)}
              />

              <View style={{ width: "100%" }}>
                <Menu
                  visible={showCategories}
                  onDismiss={() => {
                    setShowCategories(false);
                  }}
                  contentStyle={{ backgroundColor: "white" }}
                  anchor={
                    <Button
                      style={{
                        backgroundColor: MD2Colors.grey100,
                        marginTop: 15,
                        borderRadius: 13,
                      }}
                      contentStyle={{
                        padding: 10,
                        borderRadius: 15,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                      onPress={() => setShowCategories(true)}
                      textColor={MD2Colors.grey800}
                    >
                      Category
                    </Button>
                  }
                  style={{
                    width: "90%",
                  }}
                >
                  <Menu.Item
                    onPress={() => {
                      setCategory("Laptops");
                    }}
                    title="Laptops"
                  />
                  <Menu.Item
                    onPress={() => {
                      setCategory("Phones");
                    }}
                    title="Phones"
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => {
                      setCategory("Computers");
                    }}
                    title="Computers"
                  />
                </Menu>
              </View>

              <TextInput
                mode="outlined"
                label="Description"
                placeholder=""
                outlineColor={"transparent"}
                activeOutlineColor="black"
                style={styles.textInput}
                // numberOfLines={6}
                // multiline
                keyboardType="default"
                // right={<TextInput.Affix text="/100" />}
                onChangeText={(value) => setDescription(value)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              padding: 25,
              borderRadius: 50,
              backgroundColor: "#2962C0",
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              createProduct();
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: MD2Colors.grey100,
    marginTop: 10,
    width: "100%",
    borderRadius: 55,
    // overflow: "hidden",
  },
});
