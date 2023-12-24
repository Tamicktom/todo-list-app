//* Libraries imports
import { useState, Suspense } from "react";
import { View, Text, SafeAreaView, StatusBar, Pressable, Modal, Dimensions, TextInput } from "react-native";
import { useAtom } from "jotai";
import { Plus } from "phosphor-react-native";

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
      <Pressable style={{
        backgroundColor: theme.colors.blue,
        borderRadius: 100,
        padding: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
        onPress={() => setIsModalVisible(true)}
      >
        <Plus color="white" size={48} weight="light" />
      </Pressable>
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

  console.log(tasks.taskList);

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
          backgroundColor: "blue",
        }}>
          <View style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            zIndex: 2,
          }}>
            <Text style={{
              fontSize: 24,
              color: "black",
            }}>Criar tarefa</Text>

            <TextInput
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: 8,
                marginTop: 8,
                marginBottom: 16,
              }}
              placeholder="Título da tarefa"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />

            <Pressable style={{
              backgroundColor: theme.colors.blue,
              borderRadius: 8,
              padding: 8,
            }}
              onPress={() => {
                tasks.addTask(taskTitle);
                setTaskTitle(() => "");
                props.closeModal();
              }}
            >
              <Text style={{
                color: "white",
              }}>Criar</Text>
            </Pressable>

          </View>
        </View>
      </View>
    </Modal>
  )
}