//* Libraries imports
import { useAtom } from "jotai";

//* Local imports
import { taskListAtom } from "../atoms/taskList";
import { generateRandomId } from "../utils/idGenerator";

/**
 * Custom hook to manage the task list.
 * @returns {Object} taskList, addTask, completeTask, deleteTask
 */

export const useTasks = () => {
  const [taskList, setTaskList] = useAtom(taskListAtom);

  /**
   * Add a new task to the task list. The task is not completed by default.
   * @param {string} title - The title of the task.
   */

  const addTask = (title: string) => {
    const newTask = {
      id: generateRandomId(),
      title,
      completed: false,
      date: {
        created: new Date().toISOString(),
        completed: "",
      },
    };
    setTaskList(async (prev) => [...(await prev), newTask]);
  };

  /**
   * Mark a task as completed.
   * @param {string} id - The id of the task.
   */

  const completeTask = (id: string) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) {
        task.completed = true;
        task.date.completed = new Date().toISOString();
      }
      return task;
    });
    setTaskList(() => [...newTaskList]);
  };

  /**
   * Delete a task from the task list.
   * @param {string} id - The id of the task.
   */

  const deleteTask = (id: string) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(() => [...newTaskList]);
  };

  return {
    taskList,
    addTask,
    completeTask,
    deleteTask,
  };
};
