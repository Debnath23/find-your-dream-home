import { Colors } from "@/constants/Colors";
import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
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
}: SettingItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 8,
    }}
  >
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          resizeMode: "contain",
          ...(typeof textStyle === "object" ? textStyle : {}),
        }}
      />
      <Text
        style={{
          fontFamily: "Medium",
          fontSize: 16,
          color: Colors.BLACK2,
          ...(typeof textStyle === "object" ? textStyle : {}),
        }}
      >
        {title}
      </Text>
    </View>

    {showArrow && (
      <Image
        source={icons.rightArrow}
        style={{
          width: 20,
          height: 20,
          resizeMode: "contain",
          tintColor: Colors.BLACK2,
        }}
      />
    )}
  </TouchableOpacity>
);

type Props = {};

const Profile = (props: Props) => {
  const handleLogout = () => {};
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#fff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 128,
          paddingHorizontal: 28,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 20,
              color: "#191D31",
              marginTop: 24,
            }}
          >
            Profile
          </Text>
          <Image
            source={icons.bell}
            style={{
              width: 24,
              height: 24,
              resizeMode: "contain",
              position: "absolute",
              right: 0,
              top: 26,
            }}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              // marginTop: 20,
            }}
          >
            <Image
              source={images.avatar}
              style={{
                width: 140,
                height: 140,
                resizeMode: "contain",
                position: "relative",
                borderRadius: 50,
              }}
            />
            <TouchableOpacity>
              <Image
                source={icons.edit}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: "contain",
                  position: "absolute",
                  bottom: 6,
                  left: 38,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: 24,
                color: "#191D31",
                marginTop: 8,
              }}
            >
              Debnath Mahapatra
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 24,
          }}
        >
          <SettingsItem title="My Bookings" icon={icons.calendar} />
          <SettingsItem title="Payments" icon={icons.wallet} />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
          }}
        >
          {settings.slice(2).map((setting, index) => (
            <SettingsItem key={index} {...setting} />
          ))}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
          }}
        >
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            onPress={handleLogout}
            showArrow={false}
            textStyle={{ color: "#ff0000" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
