//* Libraries imports
import { atomWithStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  date: {
    created: string;
    completed: string;
  };
};

export const taskListAtom = atomWithStorage<Task[]>("taskList", [], {
  setItem: async (key, newValue) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      return await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  },
  getItem: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  },
  removeItem: async (key) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  },
});
