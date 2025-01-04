import { Image, StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { Colors } from "@/constants/Colors";

const BellIcon = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const dynamicStyles = StyleSheet.create({
    bellIcon: {
      tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK1,
    },
  });
  return (
    <View>
      <Image
        source={icons.bell}
        style={[styles.bellIcon, dynamicStyles.bellIcon]}
      />
      <View
        style={{
          width: 8,
          height: 8,
          position: "absolute",
          right: 2,
          top: 2,
          borderRadius: 99,
          backgroundColor: Colors.PRIMARY1,
        }}
      ></View>
    </View>
  );
};

export default BellIcon;

const styles = StyleSheet.create({
  bellIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
