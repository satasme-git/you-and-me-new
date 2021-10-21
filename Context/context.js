import React from 'react';

export default React.createContext({
  tasks: [],
  name:[],
  catVal:'0',
  sub:'aaa',
  email:'aaa',

  addNewTask : (task) => {},
  addCart : (task) => {},
  addSub : (task) => {},
  addEmail : (task) => {},
  deleteTask : (taskId) => {}
});