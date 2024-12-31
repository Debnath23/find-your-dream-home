import { Colors } from "@/constants/Colors";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const SignIn = (props: Props) => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  const handleLogin = async () => {
    const response = await login();

    if (response) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image style={styles.image} source={images.onboarding} />

        <View style={styles.content}>
          <Text style={styles.welcomeText}>WELCOME TO REAL SCOUT</Text>

          <Text style={styles.title}>
            Let's Get Closer to {"\n"}
            <Text style={styles.highlightText}>Your Dream Home</Text>
          </Text>

          <Text style={styles.subText}>Login to Real Scout with Google</Text>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <View style={styles.buttonContent}>
              <Image source={icons.google} style={styles.googleIcon} />
              <Text style={styles.buttonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    height: "100%",
  },
  image: {
    width: "100%",
    height: "67%",
    resizeMode: "contain",
  },
  content: {
    paddingHorizontal: 10,
  },
  welcomeText: {
    textAlign: "center",
    fontFamily: "Regular",
    color: Colors.BLACK3,
  },
  title: {
    textAlign: "center",
    fontFamily: "Bold",
    color: Colors.BLACK1,
    fontSize: 24,
    marginTop: 8,
  },
  highlightText: {
    color: Colors.PRIMARY1,
  },
  subText: {
    textAlign: "center",
    fontFamily: "Regular",
    color: Colors.BLACK3,
    fontSize: 16,
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
    paddingVertical: 12,
    borderRadius: 99,
    marginTop: 16,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  buttonText: {
    fontFamily: "Medium",
    color: Colors.BLACK2,
    marginLeft: 8,
    fontSize: 17,
  },
});
