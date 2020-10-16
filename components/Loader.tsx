import React, { useState, useEffect, FC, forwardRef } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import SplashScreen, {
  preventAutoHideAsync,
  hideAsync,
} from "expo-splash-screen";

const Loader = forwardRef(({ children, ...props }, ref: any) => {
  const [isLoading, setIsLoading] = useState(true);
  console.log(children);
  useEffect(() => {
    preventAutoHideAsync();
    return () => {
      setIsLoading(false),
        async () => {
          await hideAsync();
        };
    };
  });
  if (isLoading) {
    return (
      <View style={styles.container} ref={ref}>
        <Image source={require("../assets/images/logo_qualidata.png")} />
      </View>
    );
  }

  return <View ref={ref}>{children}</View>;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
});

export default Loader;
