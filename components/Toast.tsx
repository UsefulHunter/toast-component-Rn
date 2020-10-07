import React, {FC, useEffect, useRef, useCallback} from "react";
import Constants from 'expo-constants'
import { StyleSheet, Text, View, Animated, SafeAreaView } from "react-native";
import { ToastType } from "./ToastProvider";
import { useToast } from "../hooks/useToast";

const fadeDuration = 300;

export const Toast: FC = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { toastConfig, hideToast } = useToast();
  console.log("BarHeight",Constants.statusBarHeight)
  
  const fadeIn = useCallback(() => {
      Animated.timing(opacity, {
          toValue: 1,
          duration: fadeDuration,
          useNativeDriver: true,
      }).start();
  }, [opacity]);

  const fadeOut = useCallback(() => {
      Animated.timing(opacity, {
          toValue: 0,
          duration: fadeDuration,
          useNativeDriver: true,
      }).start(() => {
          hideToast();
      });
  }, [opacity, hideToast])
    

  useEffect(() => {
    if (!toastConfig) {
      return;
    }

    fadeIn();

    const timer = setTimeout(fadeOut, toastConfig.duration);

    return () => clearTimeout(timer);
  }, [toastConfig, fadeIn, fadeOut]);

  // When config is null, toast is hidden
  if (!toastConfig) {
    return null;
  }

  const { type, message } = toastConfig;

  let backgroundColor;
  switch (type) {
    case ToastType.Info:
      backgroundColor = 'blue';
      break;
    case ToastType.Error:
      backgroundColor = 'red';
      break;
    case ToastType.Success:
      backgroundColor = 'green';
      break;
  }

  return (
    <Animated.View style={styles.container}>
      <View style={[styles.toast, { backgroundColor }]}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    position: "absolute",
    paddingTop: Constants.statusBarHeight,
    marginHorizontal: 20,
    maxWidth: '480',
  },
  toast: {
    borderRadius: 6,
    padding: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: '#fff',
  },
});