//* Libraries imports
import { View, Text, SafeAreaView, StatusBar, Pressable } from "react-native";
import { Plus } from "phosphor-react-native";

//* Components imports
import * as Button from "../../components/Button";

//* Local imports
import theme from "../../utils/theme";

export function Home() {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.colors.gray[700],
      padding: 16,
      position: "relative",
    }}>
      <StatusBar translucent animated barStyle="light-content" />
      <Header />

      <Button.Create />
    </SafeAreaView>
  )
}

function Header() {
  return (
    <View style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    }}>
      <View style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}>
        <Text style={{
          fontSize: 24,
          color: "white",
        }}>Criadas</Text>
        <Text style={{
          fontSize: 24,
          color: "white",
        }}>999</Text>
      </View>
      <View style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}>
        <Text style={{
          fontSize: 24,
          color: "white",
        }}>Concluidas</Text>
        <Text style={{
          fontSize: 24,
          color: "white",
        }}>999</Text>
      </View>
    </View>
  );
}