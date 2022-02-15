import React from "react";
import { Task } from "../../types";

interface ITasksProps {
  tasks: Task[];
}

const TaskList = (props: ITasksProps) => {
  return (
    <div>
      {props.tasks.length > 0 ? (
        props.tasks.map((task, id) => {
          return <p key={id}>{task.name}</p>;
        })
      ) : (
        <div>Sorry, there aren't any tasks right now!</div>
      )}
    </div>
  );
};

export default TaskList;
