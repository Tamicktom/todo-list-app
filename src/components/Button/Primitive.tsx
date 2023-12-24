//* Libraries imports
import { useState, type ReactNode } from "react";
import { View, Text, Pressable, type PressableProps } from "react-native";
import Animated, { useSharedValue, withTiming, Easing } from "react-native-reanimated";

//* Local imports
import theme from "../../utils/theme";

interface Props extends PressableProps { }

export function Primitive(props: Props) {
  const scale = useSharedValue(1);

  return (
    <Animated.View
      style={{
        transform: [
          {
            scale,
          }
        ],
      }}
    >
      <Pressable
        onPressIn={(e) => {
          scale.value = withTiming(0.95, {
            duration: 100,
            easing: Easing.bounce,
          });
        }}
        onPressOut={(e) => {
          scale.value = withTiming(1, {
            duration: 100,
            easing: Easing.bounce,
          });
        }}
        style={{
          backgroundColor: theme.colors.blue,
          borderRadius: 100,
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        {...props}
      >
        {
          typeof props.children === "string"
            ? <Text style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 28,
            }}>{props.children}</Text>
            : props.children
        }
      </Pressable>
    </Animated.View>
  );
}