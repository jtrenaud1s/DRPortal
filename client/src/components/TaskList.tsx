import React from "react";
import { Task } from "../models/task";
import TaskListItem from "./TaskListItem";

interface ITasksProps {
  tasks: Task[];
}

const TaskList = ({tasks}: ITasksProps) => {

  return (
    <React.Fragment>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))
      ) : (
        <div className="h4 text-muted m-5">
          Sorry, there aren't any tasks right now!
        </div>
      )}
    </React.Fragment>
  );
};

export default TaskList;
