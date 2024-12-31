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

type Props = {};

const Search = (props: Props) => {
  const path = usePathname();
  const params = useLocalSearchParams();
  const [search, setSearch] = useState(
    typeof params.query === "string" ? params.query : ""
  );

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search your dream home"
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} style={styles.filterIcon} />
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
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: Colors.BLACK3,
    width: "90%",
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
    color: Colors.BLACK3,
    marginLeft: 10,
    display: "flex",
  },
  filterIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
