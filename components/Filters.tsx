import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme || "light"];

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item, index) => {
        const isSelected = selectedCategory === item.category;

        return (
          <TouchableOpacity
            onPress={() => handleCategoryChange(item.category)}
            style={[
              styles.categoryButton,
              {
                backgroundColor: isSelected
                  ? Colors.PRIMARY1
                  : themeColors.background,
                borderColor: isSelected ? Colors.PRIMARY1 : themeColors.text,
              },
            ]}
            key={index}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: isSelected ? Colors.WHITE : themeColors.text,
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  categoryButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 0.6,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Regular",
  },
});
