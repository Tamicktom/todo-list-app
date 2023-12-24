//* Libraries imports
import { View, Text, Pressable, StyleSheet } from "react-native";
import { CheckCircle, Circle, Trash } from "phosphor-react-native";

//* Local imports
import theme from "../../../utils/theme";

//* Hooks imports
import { useTask } from "../../../hooks/useTask";

type TaskItemProps = {
  id: string;
}

/**
 * This component is a task item. 
 * 
 * It shows the task title, a button to mark the task as completed and a button to delete the task.
 * 
 * It uses the {@link useTask} hook to get the task data and methods.
 * 
 * To work properly, it needs to receive the task id as a prop.
 */

export function TaskItem(props: TaskItemProps) {
  const task = useTask(props.id);

  return (
    <View style={styles.container}>
      <Pressable onPress={task.toggleTask} style={styles.checkButton}>
        {
          task.data.completed
            ? <CheckCircle size={24} color={theme.colors.blue} />
            : <Circle size={24} color={theme.colors.purple} />
        }
      </Pressable>
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            {
              textDecorationLine: task.data.completed ? "line-through" : "none",
            },
          ]}
        >
          {task.data.title}
        </Text>
      </View>
      <Pressable onPress={task.deleteTask} style={styles.deleteButton}>
        <Trash size={24} color={theme.colors.gray[300]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  checkButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    color: "white",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});
