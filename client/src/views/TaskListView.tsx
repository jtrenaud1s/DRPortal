import React, { useEffect } from "react";
import TaskList from "../features/tasks/TaskList";
import { fetchTasks } from "../features/tasks";
import MainLayout from "../layout/MainLayout";
import { useAppDispatch, useAppSelector } from "../store";

const TaskListView = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch]);

  return (
    <MainLayout>
      {state.isLoading ? <div>Loading Tasks...</div> : <TaskList tasks={state.tasks} />}
    </MainLayout>
  );
};

export default TaskListView;
