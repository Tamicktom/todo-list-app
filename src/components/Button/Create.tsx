//* Libraries imports
import { View, Text, SafeAreaView, StatusBar, Pressable } from "react-native";
import { Plus } from "phosphor-react-native";

//* Local imports
import theme from "../../utils/theme";

export function Create() {
  return (
    <Pressable style={{
      position: "absolute",
      bottom: 16,
      right: 16,
      backgroundColor: theme.colors.blue,
      borderRadius: 100,
      padding: 8,
    }}>
      <Plus color="white" size={48} weight="light" />
    </Pressable>
  )
}