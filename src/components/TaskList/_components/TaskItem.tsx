//* Libraries imports
import { useEffect, useState } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { CheckCircle, Circle, Trash } from "phosphor-react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, Layout } from "react-native-reanimated";

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
  const [isOpen, setIsOpen] = useState(false);

  const task = useTask(props.id);
  const opacity = useSharedValue(0);
  const scaleY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    scaleY.value = withSpring(1, { damping: 10 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scaleY: scaleY.value,
        }
      ]
    };
  });

  const handleDeleteTask = () => {
    opacity.value = withTiming(0, { duration: 500 });
    scaleY.value = withSpring(0, { damping: 10 });
    setTimeout(() => {
      task.deleteTask();
    }, 500);
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]} layout={Layout.duration(500)}>
      <Animated.View style={{ height: isOpen ? "auto" : 40 }} layout={Layout.duration(500)}>
        <Pressable onPress={task.toggleTask} style={styles.checkButton}>
          {
            task.data.completed
              ? <CheckCircle size={24} color={theme.colors.blue} />
              : <Circle size={24} color={theme.colors.purple} />
          }
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.titleWrapper, { height: isOpen ? "auto" : 40 }]} layout={Layout.duration(500)}>
        <Pressable
          style={[styles.titleContainer]}
          onPress={() => setIsOpen((prev) => !prev)}
        >
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
        </Pressable>
      </Animated.View>
      <Animated.View style={{ height: isOpen ? "auto" : 40 }} layout={Layout.duration(500)}>
        <Pressable onPress={handleDeleteTask} style={styles.deleteButton}>
          <Trash size={24} color={theme.colors.gray[300]} />
        </Pressable>
      </Animated.View>
    </Animated.View>
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
  titleWrapper: {
    flex: 1,
    overflow: "hidden",
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
    width: "100%",
    textAlign: "left",
    height: "auto",
    padding: 4,
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});
