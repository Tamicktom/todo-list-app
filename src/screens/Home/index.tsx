//* Libraries imports
import { Suspense } from "react";
import { View, Text, SafeAreaView, StatusBar, Pressable, FlatList } from "react-native";
import { Plus } from "phosphor-react-native";

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
        <TaskItem task={item} />
      )}
    />
  )
}

type TaskItemProps = {
  task: Task;
}

function TaskItem(props: TaskItemProps) {
  return (
    <View>
      <Text style={{ color: "white" }}>{props.task.title}</Text>
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