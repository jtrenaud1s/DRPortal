import React from "react";
import { Alert, Button } from "react-bootstrap";
import TaskList from "../../components/tasks/TaskList";
import { useFetchAllTasksQuery } from "../../services/taskService";
import Loadscreen from "../../components/Loadscreen";
import { LinkContainer } from "react-router-bootstrap";
import MainLayoutWithToolbar from "../../layout/MainLayoutWithToolbar";

const TaskListView = () => {
  const { data: tasks, error, isLoading } = useFetchAllTasksQuery();

  const newTaskButton = (
    <LinkContainer to="">
      <Button
        size="sm"
        variant="default"
        className="border-end border-start rounded-0">
        Create Task
      </Button>
    </LinkContainer>
  );

  if (isLoading) return <Loadscreen />;

  return (
    <MainLayoutWithToolbar toolbarContent={newTaskButton}>
      {error && <Alert>{`${error}`}</Alert>}

      <TaskList tasks={tasks || []} />
    </MainLayoutWithToolbar>
  );
};

export default TaskListView;
