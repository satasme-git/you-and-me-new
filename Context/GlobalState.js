import React from 'react';
import Context from './context';

export default class GlobalState extends React.Component {
  state = {
    tasks: [],
    name: [],
    catVal:"0",
    sub:"aaa",
    email:"aaa",
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
  addEmail = (task) => {
    this.setState({
      email: task,
    });
  };
  
  addSub = (task) => {
    this.setState({
      sub: task,
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
          sub:this.state.sub,
          email:this.state.email,


          addNewTask: this.addNewTask,
          addSub: this.addSub,
          addCart: this.addCart,
          addEmail: this.addEmail,
          deleteTask: this.deleteTask,
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
