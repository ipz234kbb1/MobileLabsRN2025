import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

const initialTasks = {
  clickTen: { count: 0, completed: false, goal: 10 },
  doubleTapFive: { count: 0, completed: false, goal: 5 },
  holdThreeSeconds: { count: 0, completed: false, goal: 1 },
  dragObject: { count: 0, completed: false, goal: 1 },
  swipeRight: { count: 0, completed: false, goal: 1 },
  swipeLeft: { count: 0, completed: false, goal: 1 },
  changeSize: { count: 0, completed: false, goal: 1 },
  score100: { count: 0, completed: false, goal: 100 },
};


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);


  const updateTaskCount = (taskName, count = 1, goalValue = null) => {
    setTasks(prevTasks => {
      const task = prevTasks[taskName];
      const newCount = task.count + count;
      const goal = goalValue || task.goal;
      
      return {
        ...prevTasks,
        [taskName]: {
          ...task,
          count: newCount,
          completed: newCount >= goal || task.completed
        }
      };
    });
  };


  const completeTask = (taskName, count = 1) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [taskName]: {
        ...prevTasks[taskName],
        count: count,
        completed: true
      }
    }));
  };


  const resetTasks = () => {
    setTasks(initialTasks);
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        updateTaskCount, 
        completeTask,
        resetTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};


export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}; 