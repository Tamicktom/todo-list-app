//* Libraries imports
import { useState, Suspense } from "react";
import { View, Text, SafeAreaView, StatusBar, Pressable, Modal, Dimensions, TextInput } from "react-native";
import { useAtom } from "jotai";
import { Plus } from "phosphor-react-native";

//* Components imports
import { Primitive } from "./Primitive";

//* Local imports
import theme from "../../utils/theme";

//* Hooks imports
import { useTasks } from "../../hooks/useTasks";

export function Create() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={{
      width: "100%",
      position: "absolute",
      bottom: 0,
      left: 0,
      padding: 16,
    }}>
      <Primitive
        onPress={() => setIsModalVisible(true)}
      >
        <Plus color="white" size={32} weight="light" />
      </Primitive>
      <Suspense>
        <CreateTaskModal isVisible={isModalVisible} closeModal={closeModal} />
      </Suspense>
    </View>
  )
}

type CreateTaskModalProps = {
  isVisible: boolean;
  closeModal: () => void;
}

function CreateTaskModal(props: CreateTaskModalProps) {
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
      // transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.closeModal();
      }}
      style={{
        flex: 1,
      }}
      hardwareAccelerated
      transparent
    >
      <View style={{
        flex: 1,
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
        {/* CLOSER */}
        <View style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}>
          <Pressable style={{
            width: "100%",
            height: "100%",
          }}
            onPress={props.closeModal}
          />
        </View>

        {/* MODAL */}
        <View style={{
          width: "100%",
          backgroundColor: theme.colors.gray[300],
          paddingTop: 1,
          borderTopLeftRadius: 16 - 1,
          borderTopRightRadius: 16 - 1,
        }}>
          <View style={{
            width: "100%",
            backgroundColor: theme.colors.gray[500],
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 16,
            paddingBottom: 32,
            zIndex: 2,
            gap: 16,
          }}>
            <Text style={{
              fontSize: 24,
              color: "white",
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
            }}>Criar tarefa</Text>

            <TextInput
              style={{
                backgroundColor: theme.colors.gray[500],
                borderRadius: 8,
                padding: 8,
                marginTop: 8,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: theme.colors.gray[300],
                color: "white",
              }}
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