import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { Entypo } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam("id")
  );

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

ShowScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
      <Entypo name="edit" size={24} color="black" />
    </TouchableOpacity>
  ),
});

export default ShowScreen;
