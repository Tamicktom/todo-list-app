//* Libraries imports
import { useState, Suspense } from "react";
import { View, StyleSheet } from "react-native";
import { Plus } from "phosphor-react-native";

//* Components imports
import { Primitive } from "./Primitive";
import { CreateTaskModal } from "./_components/CreateTaskModal";

/**
 * This component is a button that creates a task.
 * When the user clicks on it, the {@link CreateTaskModal} is shown.
 */

export function Create() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      <Primitive onPress={() => setIsModalVisible(true)}>
        <Plus color="white" size={32} weight="light" />
      </Primitive>
      <Suspense>
        <CreateTaskModal isVisible={isModalVisible} closeModal={closeModal} />
      </Suspense>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 16,
  },
});
