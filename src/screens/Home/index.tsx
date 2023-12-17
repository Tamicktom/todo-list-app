//* Libraries imports
import { View, Text, StyleSheet } from "react-native";

export function Home() {
  return (
    <View style={s.container}>
      <Text>Home</Text>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});