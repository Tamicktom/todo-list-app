//* Libraries imports
import { Suspense } from "react";
import { View, Text, SafeAreaView, StatusBar, Pressable, FlatList } from "react-native";
import { Plus, CheckCircle, Circle, Trash } from "phosphor-react-native";

//* Components imports
import * as Button from "../../components/Button";

//* Local imports
import theme from "../../utils/theme";

//* Hooks imports
import { useTasks } from "../../hooks/useTasks";
import { useTask } from "../../hooks/useTask";

export function Home() {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.colors.gray[700],
      position: "relative",
    }}>
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

function TaskList() {
  const { taskList } = useTasks();

  return (
    <FlatList
      data={taskList}
      keyExtractor={item => item.id}
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: 16,
        paddingBottom: 96,
      }}
      renderItem={({ item }) => (
        <TaskItem id={item.id} />
      )}
      style={{
        flex: 1,
      }}
    />
  )
}

type TaskItemProps = {
  id: string;
}

function TaskItem(props: TaskItemProps) {
  const task = useTask(props.id);

  return (
    <View style={{
      flex: 1,
      display: "flex",
      flexDirection: "row",
      backgroundColor: theme.colors.gray[500],
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      borderRadius: 8,
      borderColor: theme.colors.gray[500],
      borderWidth: 1,
      gap: 8,
    }}>
      <Pressable onPress={task.toggleTask}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        {
          task.data.completed
            ? <CheckCircle size={24} color={theme.colors.blue} />
            : <Circle size={24} color={theme.colors.purple} />
        }
      </Pressable>
      <View style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
      }}>
        <Text
          style={{
            color: "white",
            textDecorationLine: task.data.completed ? "line-through" : "none",
          }}
        >
          {task.data.title}
        </Text>
      </View>
      <Pressable
        onPress={task.deleteTask}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        <Trash size={24} color={theme.colors.gray[300]} />
      </Pressable>
    </View>
  );
}

function Header() {
  const { taskList } = useTasks();

  return (
    <View style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      paddingTop: 16,
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
        }}>
          {taskList.length}
        </Text>
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
        }}>
          {taskList.filter(task => task.completed).length}
        </Text>
      </View>
    </View>
  );
}