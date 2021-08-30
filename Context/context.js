import React from 'react';

export default React.createContext({
  tasks: [],
  name:[],
  catVal:'0',

  addNewTask : (task) => {},
  addCart : (task) => {},
  deleteTask : (taskId) => {}
});