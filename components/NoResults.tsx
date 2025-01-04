import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "@/constants/images";

type Props = {};

const NoResults = ({ style }: { style: any }) => {
  return (
    <View style={styles.container}>
      <Image source={images.noResult} style={styles.image} />
      <Text style={[styles.title, style]}>No Results</Text>
      <Text style={[styles.description, style]}>
        We could not find any property
      </Text>
    </View>
  );
};

export default NoResults;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontFamily: "Bold",
  },
  description: {
    fontSize: 14,
    fontFamily: "Regular",
    textAlign: "center",
  },
});
