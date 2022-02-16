import React from "react";
import { Col, Row } from "react-bootstrap";
import UserCommitteeSidebar from "../../components/UserCommitteeSidebar";
import TaskList from "../../components/TaskList";
import TaskStatRow from "../../components/TaskStatRow";
import MainLayout from "../../layout/MainLayout";
import { Committee } from "../../models/committee";
import { Task } from "../../models/task";
import { User } from "../../models/user";
import {
  useFetchAllCommitteesQuery,
  useFetchAllTasksQuery,
  useFetchAllUsersQuery,
} from "../../services/apiService";
import { useAppSelector } from "../../store";

const TaskListView = () => {
  const { data, error, isLoading } = useFetchAllTasksQuery();
  const {
    data: committees,
    error: cError,
    isLoading: cIsLoading,
  } = useFetchAllCommitteesQuery();
  const {
    data: users,
    error: uError,
    isLoading: uIsLoading,
  } = useFetchAllUsersQuery();

  const user = useAppSelector((state) => state.auth.currentUser) as User;
  const userTasks = data?.filter((task) => task.assignees.includes(user.id!));

  const stats = [
    { title: "All Tasks", value: data?.length },
    { title: "Your Tasks", value: userTasks?.length },
    { title: "Open Tasks", value: data?.length },
    { title: "Overdue Tasks", value: data?.length },
  ];
  return (
    <MainLayout>
      {error || cError || uError ? (
        <>error</>
      ) : isLoading || cIsLoading || uIsLoading ? (
        <>Loading...</>
      ) : data && committees && users ? (
        <React.Fragment>
          <Row>
            <Col lg={9}>
              <TaskStatRow stats={stats} />
              <TaskList
                tasks={data as Task[]}
                committees={committees as Committee[]}
                users={users as User[]}
              />
            </Col>
            <Col lg={3}>
              <UserCommitteeSidebar />
            </Col>
          </Row>
        </React.Fragment>
      ) : null}
    </MainLayout>
  );
};

export default TaskListView;
