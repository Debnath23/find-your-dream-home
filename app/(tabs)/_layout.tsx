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
}: {
  icon: any;
  focused: boolean;
  title: string;
}) => (
  <View
    style={{
      display: "flex",
      marginTop: 12,
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Image
      source={icon}
      style={{
        height: 24,
        width: 24,
        resizeMode: "contain",
      }}
      tintColor={focused ? "#0061ff" : "#666876"}
    />
    <Text
      style={{
        color: focused ? "#0061ff" : "#666876",
        fontSize: 10,
        fontFamily: "Medium",
        width: "100%",
        marginTop: 4,
        alignItems: "center",
      }}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
