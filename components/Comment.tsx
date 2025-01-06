import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: { item: any }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const styles = createStyles(isDarkMode);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <Text style={styles.review}>{item.review}</Text>

      <View style={styles.footer}>
        <View style={styles.likesContainer}>
          <Image source={icons.heart} style={styles.icon} />
          <Text style={styles.likesCount}>120</Text>
        </View>
        <Text style={styles.date}>
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Comment;

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    name: {
      fontSize: 16,
      color: isDarkMode ? Colors.dark.text : Colors.BLACK2,
      textAlign: "left",
      fontFamily: "Medium",
      marginLeft: 12,
    },
    review: {
      color: isDarkMode ? Colors.dark.text : Colors.BLACK3,
      fontSize: 14,
      fontFamily: "Regular",
      marginTop: 10,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      marginVertical: 12,
    },
    likesContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      width: 20,
      height: 20,
    },
    likesCount: {
      color: isDarkMode ? Colors.dark.text : Colors.BLACK2,
      fontSize: 14,
      fontFamily: "Medium",
      marginLeft: 8,
    },
    date: {
      color: isDarkMode ? Colors.dark.text : "#8C8E98",
      fontSize: 14,
      fontFamily: "Regular",
    },
  });
