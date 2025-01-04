import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { Colors } from "@/constants/Colors";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";
import { useColorScheme } from "@/hooks/useColorScheme";

type Props = {};

const Search = ({ style }: { style?: object }) => {
  const path = usePathname();
  const params = useLocalSearchParams();
  const [search, setSearch] = useState(
    typeof params.query === "string" ? params.query : ""
  );
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View
      style={[
        style,
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.BLACK3 : Colors.WHITE,
          borderColor: isDarkMode ? Colors.WHITE : Colors.BLACK3,
        },
      ]}
    >
      <View style={styles.searchBar}>
        <Image
          source={icons.search}
          style={[
            styles.searchIcon,
            { tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK3 },
          ]}
        />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search your dream home"
          placeholderTextColor={isDarkMode ? Colors.WHITE : Colors.BLACK3}
          style={[
            styles.textInput,
            { color: isDarkMode ? Colors.WHITE : Colors.BLACK3 },
          ]}
        />
      </View>
      <TouchableOpacity>
        <Image
          source={icons.filter}
          style={[
            styles.filterIcon,
            { tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK3 },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 12,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textInput: {
    fontFamily: "Regular",
    fontSize: 14,
    marginLeft: 10,
    display: "flex",
  },
  filterIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
