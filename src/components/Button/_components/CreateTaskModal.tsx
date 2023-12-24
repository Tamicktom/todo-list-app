//* Libraries imports
import { useState } from "react";
import { View, Text, Pressable, Modal, TextInput, StyleSheet } from "react-native";

//* Components imports
import { Primitive } from "../Primitive";

//* Local imports
import theme from "../../../utils/theme";

//* Hooks imports
import { useTasks } from "../../../hooks/useTasks";

type CreateTaskModalProps = {
  isVisible: boolean;
  closeModal: () => void;
}

/**
 * This component is a modal that creates a task.
 * The user can type the task title and create it.
 */

export function CreateTaskModal(props: CreateTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const tasks = useTasks();

  const handleCreateTask = () => {
    if (taskTitle === "") return;

    tasks.addTask(taskTitle);
    setTaskTitle(() => "");
    props.closeModal();
  }

  return (
    <Modal
      animationType="slide"
      visible={props.isVisible}
      onRequestClose={props.closeModal}
      style={styles.modal}
      hardwareAccelerated
      transparent
    >
      <View style={styles.container}>
        {/* CLOSER */}
        <View style={styles.closer}>
          <Pressable style={styles.closerPressable} onPress={props.closeModal} />
        </View>

        {/* MODAL */}
        <View style={styles.modalContent}>
          <View style={styles.modalContentHolder}>
            <Text style={styles.modalTitle}>Criar tarefa</Text>

            <TextInput
              style={styles.input}
              placeholder="Título da tarefa"
              placeholderTextColor={theme.colors.gray[300]}
              value={taskTitle}
              onChangeText={setTaskTitle}
            />

            <Primitive onPress={handleCreateTask}>
              Criar
            </Primitive>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  closer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  closerPressable: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    width: "100%",
    backgroundColor: theme.colors.gray[300],
    paddingTop: 1,
    borderTopLeftRadius: 16 - 1,
    borderTopRightRadius: 16 - 1,
  },
  modalContentHolder: {
    width: "100%",
    backgroundColor: theme.colors.gray[500],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 32,
    zIndex: 2,
    gap: 16,
  },
  modalTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  input: {
    backgroundColor: theme.colors.gray[500],
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    color: "white",
  },
});