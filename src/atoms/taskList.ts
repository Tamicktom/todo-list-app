//* Libraries imports
import { atomWithStorage } from "jotai/utils";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  date: {
    created: string;
    completed: string;
  };
};

export const taskListAtom = atomWithStorage<Task[]>("taskList", []);
