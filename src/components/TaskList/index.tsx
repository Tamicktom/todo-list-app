//* Libraries imports
import { FlatList, StyleSheet } from "react-native";

//* Components imports
import { TaskItem } from "./_components/TaskItem";
import { EmptyTaskList } from "./_components/EmptyTaskList";

//* Hooks imports
import { useTasks } from "../../hooks/useTasks";

/**
 * This {@link FlatList} component is responsible for rendering the list of tasks.
 * 
 * It uses the {@link useTasks} hook to get the list of tasks.
 * 
 * It uses the {@link TaskItem} component to render each task.
 */

export function TaskList() {
  const { taskList } = useTasks();

  return (
    <FlatList
      data={taskList}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.content}
      renderItem={prop => <TaskItem id={prop.item.id} />}
      style={styles.container}
      ListEmptyComponent={<EmptyTaskList />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 96,
  }
})