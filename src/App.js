import React from "react";
import "./App.css";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskInput: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ taskInput: event.target.value });
  };

  addTask = () => {
    const { taskInput, tasks } = this.state;
    const trimmedInput = taskInput.trim();
    if (trimmedInput !== "") {
      if (trimmedInput === taskInput) {
        const isTaskExist = tasks.some(
          (task) => task.name.toLowerCase() === taskInput.toLowerCase()
        );
        if (!isTaskExist) {
          const newTask = {
            id: Date.now(),
            name: taskInput,
            completed: false,
          };
          this.setState({
            tasks: [...tasks, newTask],
            taskInput: "",
          });
        } else {
          alert("This task already exists!");
        }
      } else {
        alert("Task name can't start or end with spaces!");
      }
    }
  };

  toggleTaskStatus = (taskId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    this.setState({ tasks: updatedTasks });
  };

  deleteTask = (taskId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: updatedTasks });
  };

  render() {
    const { tasks, taskInput } = this.state;
    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    return (
      <section>
        <h1>TODO List</h1>
        <div id="infoTasks">
          <span>All: {tasks.length}</span>
          <span>Done: {completedTasks.length}</span>
          <span>Left: {uncompletedTasks.length}</span>
        </div>
        <div>
          <input
            maxLength={55}
            id="newTaskInput"
            type="text"
            value={taskInput}
            onChange={this.handleInputChange}
            placeholder="Enter a task name"
          />
          <button onClick={this.addTask}>Add new todo</button>
        </div>

        {uncompletedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskStatus={this.toggleTaskStatus}
            deleteTask={this.deleteTask}
          />
        ))}
        {completedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskStatus={this.toggleTaskStatus}
            deleteTask={this.deleteTask}
          />
        ))}
      </section>
    );
  }
}

class Task extends React.Component {
  handleCheckboxChange = () => {
    const { task, toggleTaskStatus } = this.props;
    toggleTaskStatus(task.id);
  };

  handleDeleteClick = () => {
    const { task, deleteTask } = this.props;
    deleteTask(task.id);
  };

  render() {
    const { task } = this.props;
    const { name, completed } = task;

    return (
      <div class="divbutton">
        <input
          type="checkbox"
          checked={completed}
          onChange={this.handleCheckboxChange}
        />
        <span class="textTask" className={completed ? "completed" : ""}>
          {name}
        </span>
        <button id="buttonDelete" onClick={this.handleDeleteClick}>
          Delete
        </button>
      </div>
    );
  }
}

export default TodoList;
