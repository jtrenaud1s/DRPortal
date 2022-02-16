import React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import UserCommitteeSidebar from "../components/UserCommitteeSidebar";
import TaskList from "../components/tasks/TaskList";
import TaskStatRow from "../components/TaskStatRow";
import MainLayout from "../layout/MainLayout";
import { Task } from "../models/task";
import { User } from "../models/user";
import { useFetchAllTasksQuery } from "../services/apiService";
import { useAppSelector } from "../store";
import Loadscreen from "../components/Loadscreen";

const DashboardView = () => {
  const { data: tasks, error, isLoading } = useFetchAllTasksQuery();

  const user = useAppSelector((state) => state.auth.currentUser) as User;
  const userTasks = tasks?.filter((task) =>
    task.assignees.map((assignee) => assignee.id).includes(user.id!)
  ) as Task[];

  const stats = [
    { title: "All Tasks", value: tasks?.length },
    { title: "Your Tasks", value: userTasks?.length },
    { title: "Open Tasks", value: tasks?.length },
    { title: "Overdue Tasks", value: tasks?.length },
  ];

  if (isLoading) return <Loadscreen />;

  return (
    <MainLayout>
      {error && <Alert>{`${error}`}</Alert>}
      <Row>
        <Col lg={3} sm={12}>
          <UserCommitteeSidebar />
        </Col>
        <Col lg={9} sm={12}>
          <TaskStatRow stats={stats} />
          <TaskList tasks={tasks || []} />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default DashboardView;
