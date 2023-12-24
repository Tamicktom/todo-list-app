//* Libraries imports
import { View, Text, StyleSheet } from "react-native";

//* Local imports
import theme from "../../utils/theme";

//* Hooks imports
import { useTasks } from "../../hooks/useTasks";

/**
 * This component is the header of the app. It shows the number of tasks created and completed.
 * 
 * It uses the {@link useTasks} hook to get the list of tasks.
 */

export function Header() {
  const { taskList } = useTasks();

  const total = taskList.length;
  const completed = taskList.filter(task => task.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.taskLabelLeft}>Criadas</Text>
        <Text style={styles.taskCount}>{total}</Text>
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskLabelRight}>Concluidas</Text>
        <Text style={styles.taskCount}>{completed}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    padding: 16,
  },
  taskContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  taskLabelLeft: {
    fontSize: 24,
    color: theme.colors.blue,
    fontWeight: "bold",
  },
  taskLabelRight: {
    fontSize: 24,
    color: theme.colors.purple,
    fontWeight: "bold",
  },
  taskCount: {
    fontSize: 24,
    color: "white",
    backgroundColor: theme.colors.gray[500],
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
