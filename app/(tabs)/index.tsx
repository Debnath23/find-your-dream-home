import Search from "@/components/Search";
import { Colors } from "@/constants/Colors";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { Image, StyleSheet, Text, View } from "react-native";
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
    marginTop: 20,
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
});
