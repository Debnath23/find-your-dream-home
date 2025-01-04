import { Redirect, Tabs } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";

const TabIcon = ({
  icon,
  focused,
  title,
  isDarkMode,
}: {
  icon: any;
  focused: boolean;
  title: string;
  isDarkMode: boolean;
}) => (
  <View
    style={{
      display: "flex",
      marginTop: 22,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Image
      source={icon}
      style={{
        height: 24,
        width: 24,
        resizeMode: "contain",
      }}
      tintColor={focused ? (isDarkMode ? "#42A5F5" : "#0061FF") : "#666876"}
    />
    <Text
      style={{
        color: focused ? (isDarkMode ? "#42A5F5" : "#0061FF") : "#666876",
        fontSize: 10,
        fontFamily: "Medium",
        width: "100%",
        marginTop: 4,
        alignItems: "center",
        marginLeft: 2,
      }}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDarkMode ? Colors.BLACK : Colors.WHITE,
        }}
      >
        <ActivityIndicator
          size="large"
          color={isDarkMode ? Colors.BLACK : Colors.WHITE}
        />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? Colors.BLACK : Colors.WHITE,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isDarkMode ? Colors.BLACK : Colors.WHITE,
          minHeight: 55,
          bottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.home}
              focused={focused}
              title="Home"
              isDarkMode={isDarkMode}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.search}
              focused={focused}
              title="Explore"
              isDarkMode={isDarkMode}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.person}
              focused={focused}
              title="Profile"
              isDarkMode={isDarkMode}
            />
          ),
        }}
      />
    </Tabs>
  );
}
