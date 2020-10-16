import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import SplashScreen, {
  preventAutoHideAsync,
  hideAsync,
} from "expo-splash-screen";

export default function TabTwoScreen() {
  const [isReady, setIsReady] = useState(false);

  const prepareResources = async () => {
    try {
      console.log("async log");
    } catch (e) {
      console.warn(e);
    } finally {
      setIsReady(true),
        async () => {
          await hideAsync();
        };
    }
  };

  return (
    <View style={styles.container}>
      <Text>SplashScreen Demo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
