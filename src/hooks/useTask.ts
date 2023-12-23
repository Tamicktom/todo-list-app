//* Libraries imports
import { useAtom } from "jotai";

//* Local imports
import { taskListAtom } from "../atoms/taskList";

/**
 * Custom hook to manage a single task from the task list.
 * @param {string} id - The id of the task.
 */

export const useTask = (id: string) => {
  const [taskList, setTaskList] = useAtom(taskListAtom);

  /**
   * Get the task from the task list.
   * @returns {Object} The task.
   */

  const getTask = () => {
    return taskList.find((task) => task.id === id);
  };

  /**
   * Mark the task as completed.
   */

  const completeTask = () => {
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
   * Delete the task from the task list.
   */

  const deleteTask = () => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(() => [...newTaskList]);
  };

  return {
    getTask,
    completeTask,
    deleteTask,
  };
};
