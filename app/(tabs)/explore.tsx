import { Card, FeaturedCard, SearchCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import { Colors } from "@/constants/Colors";
import icons from "@/constants/icons";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import Property from "@/types/property.type";
import NoResults from "@/components/NoResults";
import BellIcon from "@/components/BellIcon";

export default function ExploreScreen() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite<
    Property[],
    { filter?: string; query?: string; limit?: number }
  >({
    fn: getProperties,
    params: {
      filter: params.filter,
      query: params.query,
      limit: 20,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.BLACK : Colors.WHITE,
    },
    textPrimary: {
      color: isDarkMode ? Colors.WHITE : Colors.BLACK1,
    },
    textSecondary: {
      color: isDarkMode ? Colors.WHITE : Colors.BLACK2,
    },
    textLink: {
      color: isDarkMode ? Colors.PRIMARY2 : Colors.PRIMARY1,
    },
    noResults: {
      color: isDarkMode ? Colors.WHITE : Colors.BLACK1,
    },
    backArrow: {
      tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK1,
    },
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <FlatList
        data={properties}
        renderItem={({ item }: { item: Property }) => (
          <SearchCard item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              style={{
                marginTop: 20,
              }}
              color={Colors.PRIMARY1}
            />
          ) : (
            <NoResults style={dynamicStyles.noResults} />
          )
        }
        contentContainerStyle={{
          paddingBottom: 80,
          display: "flex",
          gap: 10,
          paddingHorizontal: 20,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={styles.backArrowContainer}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Image
                    source={icons.backArrow}
                    style={[styles.backArrow, dynamicStyles.backArrow]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.headerContent}>
                <Text style={[styles.headerText, dynamicStyles.textSecondary]}>
                  Search for Your Dream Home
                </Text>
              </View>
              <BellIcon />
            </View>
            <Search style={{ width: "100%" }} />

            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <Filters />
              </View>

              <Text
                style={[
                  dynamicStyles.textSecondary,
                  {
                    fontSize: 20,
                    fontFamily: "Medium",
                  },
                ]}
              >
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  backArrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: "#0061FF1A",
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    width: 22,
    height: 22,
  },
  headerContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Medium",
    fontSize: 16,
  },
  userName: {
    fontFamily: "Medium",
    fontSize: 13,
  },
  bellIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Bold",
  },
  sectionLink: {
    fontSize: 12,
    fontFamily: "Medium",
  },
  featuredCards: {
    display: "flex",
    gap: 14,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  cards: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 8,
  },
});
