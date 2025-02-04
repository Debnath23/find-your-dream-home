import BellIcon from "@/components/BellIcon";
import { Colors } from "@/constants/Colors";
import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SettingItemProps = {
  title: string;
  icon: ImageSourcePropType;
  textStyle?: object;
  onPress?: () => void;
  showArrow?: boolean;
};

const SettingsItem = ({
  title,
  icon,
  onPress,
  textStyle,
  showArrow = true,
}: SettingItemProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const styles = createStyles(isDarkMode);
  return (
    <TouchableOpacity onPress={onPress} style={styles.settingsItemContainer}>
      <View style={styles.settingsItemContent}>
        <Image source={icon} style={[styles.settingsItemIcon, textStyle]} />
        <Text style={[styles.settingsItemText, textStyle]}>{title}</Text>
      </View>
      {showArrow && (
        <Image source={icons.rightArrow} style={styles.settingsItemArrow} />
      )}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const styles = createStyles(isDarkMode);

  const handleLogout = async () => {
    const response = await logout();

    if (response) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "An error occurred. Please try again");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <BellIcon />
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <TouchableOpacity>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>
            <Text style={styles.name}>{user?.name}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SettingsItem title="My Bookings" icon={icons.calendar} />
          <SettingsItem title="Payments" icon={icons.wallet} />
        </View>

        <View style={[styles.section, styles.borderTop]}>
          {settings.slice(2).map((setting, index) => (
            <SettingsItem key={index} {...setting} />
          ))}
        </View>

        <View style={[styles.section, styles.borderTop]}>
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            onPress={handleLogout}
            showArrow={false}
            textStyle={{ color: Colors.DANGER, tintColor: Colors.DANGER }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: isDarkMode
        ? Colors.dark.background
        : Colors.light.background,
    },
    scrollContent: {
      paddingBottom: 128,
      paddingHorizontal: 28,
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 4,
      marginRight: 5,
    },
    header: {
      fontFamily: "Bold",
      fontSize: 20,
      color: isDarkMode ? Colors.WHITE : "#191D31",
    },
    bellIcon: {
      width: 24,
      height: 24,
      resizeMode: "contain",
      position: "absolute",
      right: 12,
      top: 26,
      tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK2,
    },
    avatarContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    avatarWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    },
    avatar: {
      width: 140,
      height: 140,
      resizeMode: "contain",
      borderRadius: 99,
    },
    editIcon: {
      width: 35,
      height: 35,
      resizeMode: "contain",
      position: "absolute",
      bottom: 4,
      left: 38,
    },
    name: {
      fontFamily: "Medium",
      fontSize: 20,
      color: isDarkMode ? Colors.WHITE : "#191D31",
      marginTop: 8,
    },
    section: {
      display: "flex",
      flexDirection: "column",
      marginTop: 24,
    },
    borderTop: {
      borderTopWidth: 1,
      borderTopColor: "#E5E5E5",
      marginTop: 20,
    },
    settingsItemContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 8,
      backgroundColor: isDarkMode
        ? Colors.dark.background
        : Colors.light.background,
    },
    settingsItemContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    settingsItemIcon: {
      width: 24,
      height: 24,
      resizeMode: "contain",
      tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK2,
    },
    settingsItemText: {
      fontFamily: "Medium",
      fontSize: 16,
      color: isDarkMode ? Colors.WHITE : Colors.BLACK2,
    },
    settingsItemArrow: {
      width: 20,
      height: 20,
      resizeMode: "contain",
      tintColor: isDarkMode ? Colors.WHITE : Colors.BLACK2,
    },
  });
