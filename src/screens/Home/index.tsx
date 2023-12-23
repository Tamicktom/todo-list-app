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
      padding: 16,
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
      renderItem={({ item }) => (
        <TaskItem id={item.id} />
      )}
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
      width: "100%",
      display: "flex",
      flexDirection: "row",
    }}>
      {
        task.data.completed
          ? <Pressable onPress={task.unCompleteTask}>
            <CheckCircle size={24} color={theme.colors.blue} />
          </Pressable>
          : <Pressable onPress={task.completeTask}>
            <Circle size={24} color={theme.colors.purple} />
          </Pressable>
      }
      <Text style={{ color: "white" }}>{task.data.title}</Text>
      <Pressable onPress={task.deleteTask}>
        <Trash size={24} color={theme.colors.darnger} />
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