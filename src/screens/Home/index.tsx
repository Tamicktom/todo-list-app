//* Libraries imports
import { Suspense } from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";

//* Components imports
import * as Button from "../../components/Button";
import { Header } from "../../components/Header";
import { TaskList } from "../../components/TaskList";

//* Local imports
import theme from "../../utils/theme";

export function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent animated barStyle="light-content" />
      <Suspense>
        <Header />
      </Suspense>

      <Suspense fallback={<View />}>
        <TaskList />
      </Suspense>

      <Button.Create />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[700],
    position: "relative",
    paddingTop: StatusBar.currentHeight,
  }
})