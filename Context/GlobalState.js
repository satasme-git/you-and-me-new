import React from 'react';
import Context from './context';

export default class GlobalState extends React.Component {
  state = {
    tasks: [],
    name: [],
    catVal:"0",
  };

  addNewTask = (task) => {
    this.setState({
      name: task,
    });
  };
  addCart = (task) => {
    this.setState({
      catVal: task,
    });
  };

  deleteTask = (taskId) => {
    this.setState(this.state.name="");
    // this.setState(this.state.tasks.splice(taskId, 1));
  };
  // deleteCart = (taskId) => {
  //   this.setState(this.state.name="");
  //   // this.setState(this.state.tasks.splice(taskId, 1));
  // };
  // deleteSubstractCart = () => {
  //   this.setState(this.state.name="");
  //   // this.setState(this.state.tasks.splice(taskId, 1));
  // };
  render() {
    return (
      <Context.Provider
        value={{
          tasks: this.state.tasks,
          name: this.state.name,
          catVal:this.state.catVal,


          addNewTask: this.addNewTask,
          addCart: this.addCart,
          deleteTask: this.deleteTask,
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
