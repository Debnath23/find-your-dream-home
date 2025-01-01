import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import { Colors } from "@/constants/Colors";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";

export default function HomeScreen() {
  const { user } = useGlobalContext();
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
    bellIcon: {
      tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK1,
    }
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={(item) => <Card onPress={() => {}} />}
        keyExtractor={(Item) => Item.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
        columnWrapperStyle={{
          display: "flex",
          gap: 10,
          paddingHorizontal: 20,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <Image source={{ uri: user?.avatar }} style={styles.avatar} />
                <View style={styles.userDetails}>
                  <Text style={[styles.greetingText, dynamicStyles.textSecondary]}>
                    Good Morning
                  </Text>
                  <Text style={[styles.userName, dynamicStyles.textSecondary]}>
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} style={[styles.bellIcon, dynamicStyles.bellIcon]} />
            </View>

            <Search />

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, dynamicStyles.textPrimary]}>Featured</Text>
                <TouchableOpacity>
                  <Text style={[styles.sectionLink, dynamicStyles.textLink]}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.featuredCards}>
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={(item) => <FeaturedCard onPress={() => {}} />}
                keyExtractor={(Item) => Item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 14 }}
                bounces={false}
              />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, dynamicStyles.textPrimary]}>
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.sectionLink, dynamicStyles.textLink]}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Filters />
            </View>
          </>
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
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 99,
  },
  userDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
    justifyContent: "center",
  },
  greetingText: {
    fontFamily: "Regular",
    fontSize: 12,
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

