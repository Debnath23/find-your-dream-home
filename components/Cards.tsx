import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Colors } from "@/constants/Colors";

interface Props {
  onPress: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handlePress = () => {
    setIsLiked(!isLiked);
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cardContainer}
      accessibilityLabel="Featured card"
      accessibilityRole="button"
    >
      <Image source={images.japan} style={styles.cardImage} />
      <Image source={images.cardGradient} style={styles.cardGradient} />

      <View style={styles.ratingContainer}>
        <Image source={icons.star} style={styles.ratingIcon} />
        <Text style={styles.ratingText}>4.4</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          Modern Apartment
        </Text>
        <Text style={styles.cardSubtitle}>22 W 15th St, New York</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.cardPrice}>$2,500</Text>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icons.heart}
              style={[
                styles.heartIcon,
                { tintColor: isLiked ? Colors.DANGER : Colors.WHITE },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handlePress = () => {
    setIsLiked(!isLiked);
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles2.cardContainer}>
      <View style={styles2.ratingContainer}>
        <Image source={icons.star} style={styles2.ratingIcon} />
        <Text style={styles2.ratingText}>4.4</Text>
      </View>

      <Image source={images.newYork} style={styles2.cardImage} />

      <View style={styles2.cardContent}>
        <Text style={styles2.cardTitle}>Cozy Studio</Text>
        <Text style={styles2.cardSubtitle}>22 W 15th St, New York</Text>

        <View style={styles2.priceContainer}>
          <Text style={styles2.cardPrice}>$2,500</Text>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icons.heart}
              style={[
                styles2.heartIcon,
                { tintColor: isLiked ? Colors.DANGER : Colors.BLACK1 },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.WHITE,
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
    color: Colors.PRIMARY1,
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

const styles2 = StyleSheet.create({
  cardContainer: {
    display: "flex",
    width: "50%",
    position: "relative",
    marginTop: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 8,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: Colors.WHITE,
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
    color: Colors.PRIMARY1,
    marginLeft: 4,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "Bold",
    color: Colors.BLACK1,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: "Regular",
    color: Colors.BLACK2,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 12,
    fontFamily: "Bold",
    color: Colors.PRIMARY1,
  },
  heartIcon: {
    width: 16,
    height: 16,
  },
});
