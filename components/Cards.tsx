import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress: () => void;
}

export const FeaturedCard = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handlePress = () => {
    setIsLiked(!isLiked);
  };

  const styles = Styles(isDarkMode);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cardContainer}
      accessibilityLabel="Featured card"
      accessibilityRole="button"
    >
      <Image source={{ uri: image }} style={styles.cardImage} />
      <Image source={images.cardGradient} style={styles.cardGradient} />

      <View style={styles.ratingContainer}>
        <Image source={icons.star} style={styles.ratingIcon} />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.cardSubtitle}>{address}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.cardPrice}>$ {price}</Text>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icons.heart}
              style={[
                styles.heartIcon,
                !isLiked && { tintColor: Colors.WHITE },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    cardContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: 180,
      height: 240,
      position: "relative",
    },
    cardImage: {
      width: "100%",
      height: "100%",
      borderRadius: 20,
    },
    cardGradient: {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: 20,
      bottom: 0,
    },
    ratingContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: 16,
      right: 16,
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.WHITE,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 100,
      zIndex: 50,
    },
    ratingIcon: {
      width: 14,
      height: 14,
    },
    ratingText: {
      fontSize: 12,
      fontFamily: "Medium",
      color: isDarkMode ? Colors.dark.tint : Colors.PRIMARY1,
      marginLeft: 5,
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      alignItems: "flex-start",
      bottom: 16,
      paddingHorizontal: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontFamily: "Bold",
      color: Colors.WHITE,
    },
    cardSubtitle: {
      fontSize: 12,
      fontFamily: "Regular",
      color: Colors.WHITE,
    },
    priceContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    cardPrice: {
      fontSize: 14,
      fontFamily: "ExtraBold",
      color: Colors.WHITE,
    },
    heartIcon: {
      width: 16,
      height: 16,
    },
  });

export const Card = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handlePress = () => {
    setIsLiked(!isLiked);
  };

  const styles = createStyles(isDarkMode);

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Image source={icons.star} style={styles.ratingIcon} />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>

      {/* Image */}
      <Image source={{ uri: image }} style={styles.cardImage} />

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardSubtitle}>{address}</Text>

        {/* Price and Like Button */}
        <View style={styles.priceContainer}>
          <Text style={styles.cardPrice}>$ {price}</Text>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icons.heart}
              style={[
                styles.heartIcon,
                !isLiked && {
                  tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK3,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    cardContainer: {
      flex: 1,
      width: "50%",
      marginTop: 4,
      borderRadius: 12,
      padding: 8,
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.WHITE,
      shadowColor: isDarkMode ? Colors.WHITE : Colors.BLACK,
      shadowOffset: {
        width: 24,
        height: 24,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4.65,
      elevation: 8,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: 16,
      right: 16,
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.WHITE,
      paddingHorizontal: 4,
      paddingVertical: 1,
      borderRadius: 100,
      zIndex: 50,
    },
    ratingIcon: {
      width: 12,
      height: 12,
    },
    ratingText: {
      fontSize: 10,
      fontFamily: "Medium",
      color: isDarkMode ? Colors.WHITE : Colors.PRIMARY1,
      marginLeft: 4,
    },
    cardImage: {
      width: "100%",
      height: 160,
      borderRadius: 10,
    },
    cardContent: {
      marginTop: 6,
    },
    cardTitle: {
      fontSize: 14,
      fontFamily: "Bold",
      color: isDarkMode ? Colors.dark.text : Colors.BLACK1,
    },
    cardSubtitle: {
      fontSize: 12,
      fontFamily: "Regular",
      color: isDarkMode ? Colors.dark.icon : Colors.BLACK2,
    },
    priceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4,
    },
    cardPrice: {
      fontSize: 12,
      fontFamily: "Bold",
      color: isDarkMode ? Colors.WHITE : Colors.PRIMARY1,
    },
    heartIcon: {
      width: 16,
      height: 16,
    },
  });

export const SearchCard = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handlePress = () => {
    setIsLiked(!isLiked);
  };

  const styles = SearchCardStyles(isDarkMode);

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      {/* Image and Rating */}
      <View>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.ratingContainer}>
          <Image source={icons.star} style={styles.ratingIcon} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {name}
          </Text>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icons.heart}
              style={[
                styles.heartIcon,
                !isLiked && {
                  tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK3,
                },
              ]}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {address}
        </Text>

        <Text style={styles.cardPrice}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchCardStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 10,
      borderRadius: 12,
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.WHITE,
      shadowColor: isDarkMode ? Colors.WHITE : Colors.BLACK,
      shadowOffset: { width: 24, height: 24 },
      shadowOpacity: 0.25,
      shadowRadius: 4.65,
      elevation: 8,
      marginBottom: 10,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      position: "absolute",
      top: 6,
      right: 6,
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.WHITE,
      paddingHorizontal: 4,
      paddingVertical: 1,
      borderRadius: 50,
      zIndex: 10,
    },
    ratingIcon: {
      width: 10,
      height: 10,
    },
    ratingText: {
      fontSize: 8,
      fontFamily: "Medium",
      color: isDarkMode ? Colors.WHITE : Colors.PRIMARY1,
      marginLeft: 2,
    },
    cardImage: {
      width: 120,
      height: 100,
      borderRadius: 10,
    },
    cardContent: {
      flex: 1,
      marginLeft: 10,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    cardTitle: {
      fontSize: 16,
      fontFamily: "Bold",
      color: isDarkMode ? Colors.dark.text : Colors.BLACK1,
      flexShrink: 1,
    },
    cardSubtitle: {
      fontSize: 12,
      fontFamily: "Medium",
      color: isDarkMode ? Colors.dark.icon : Colors.BLACK2,
      marginVertical: 4,
    },
    cardPrice: {
      fontSize: 16,
      fontFamily: "Bold",
      color: Colors.PRIMARY1,
    },
    heartIcon: {
      width: 18,
      height: 18,
    },
  });
