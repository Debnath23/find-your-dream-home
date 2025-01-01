import { Card, FeaturedCard } from "@/components/Cards";
import Search from "@/components/Search";
import { Colors } from "@/constants/Colors";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.greetingText}>Good Morning</Text>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
        </View>
        <Image source={icons.bell} style={styles.bellIcon} />
      </View>

      <Search />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featuredCards}>
        <FeaturedCard onPress={() => { }} />
        <FeaturedCard onPress={() => { }} />
        <FeaturedCard onPress={() => { }} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Recommendation</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cards}>
        <Card onPress={() => { }} />
        <Card onPress={() => { }} />
        <Card onPress={() => { }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
    color: Colors.BLACK3,
  },
  userName: {
    fontFamily: "Medium",
    fontSize: 13,
    color: Colors.BLACK2,
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
    color: Colors.BLACK1,
  },
  sectionLink: {
    fontSize: 12,
    fontFamily: "Medium",
    color: Colors.PRIMARY1,
  },
  featuredCards: {
    flexDirection: "row",
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
