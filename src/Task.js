
import React from "react";
import "./App.css";

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
        <button id="buttonDelete" onClick={this.handleDeleteClick}>Delete</button>
      </div>
    );
  }
}
export default Task;