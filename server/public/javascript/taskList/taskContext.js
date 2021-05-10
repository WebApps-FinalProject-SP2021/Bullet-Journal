import { createContext, useState } from 'react';
const TasksContext = /*#__PURE__*/createContext({
  tasks: [],
  totalTasks: 0,
  addTask: task => {},
  editTask: task => {},
  removeTask: taskId => {},
  getTask: taskId => {}
});
export function TasksContextProvider(props) {
  const initialTasks = [{
    taskId: '1',
    name: "nombre",
    description: "description"
  }, {
    taskId: '2',
    name: "nombre 2",
    description: "description 2"
  }];
  const [currentTasks, setCurrentTasks] = useState(initialTasks);

  function addTask(newTask) {
    setCurrentTasks(prevCurrentTasks => {
      return prevCurrentTasks.concat(newTask);
    });
  }

  function editTask(editedTask) {
    setCurrentTasks(prevCurrentTasks => {
      const index = prevCurrentTasks.findIndex(task => task.taskId === editedTask.taskId);
      prevCurrentTasks[index] = editedTask;
      return prevCurrentTasks;
    });
  }

  function removeTask(taskId) {
    setCurrentTasks(prevUserFavorites => {
      return prevUserFavorites.filter(task => task.taskId !== taskId);
    });
  }

  function getTask(taskId) {
    return currentTasks.some(task => task.id === taskId);
  }

  const context = {
    tasks: currentTasks,
    totalTasks: currentTasks.length,
    addTask: addTask,
    editTask: editTask,
    getTask: getTask,
    removeTask: removeTask
  };
  return /*#__PURE__*/React.createElement(TasksContext.Provider, {
    value: context
  }, props.children);
}
export default TasksContext;