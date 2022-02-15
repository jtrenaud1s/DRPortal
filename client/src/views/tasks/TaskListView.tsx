import TaskList from "../../components/TaskList";
import MainLayout from "../../layout/MainLayout";
import { useFetchAllTasksQuery } from "../../services/apiService";

const TaskListView = () => {
  const { data, error, isLoading } = useFetchAllTasksQuery();
  return (
    <MainLayout>
      {error ? (
        <>error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <TaskList tasks={data} />
      ) : null}
    </MainLayout>
  );
};

export default TaskListView;
