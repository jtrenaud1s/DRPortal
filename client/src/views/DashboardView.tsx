import React from "react";
import { Alert, Col, Row, Tab, Tabs } from "react-bootstrap";
import UserCommitteeSidebar from "../components/committees/UserCommitteeSidebar";
import TaskList from "../components/tasks/TaskList";
import StatRow from "../components/stats/StatRow";
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
          <StatRow stats={stats} />
          <Tabs
            defaultActiveKey="myTasks"
            id="uncontrolled-tab-example"
            className="mb-3">
            <Tab eventKey="myTasks" title="My Tasks">
              <TaskList tasks={userTasks || []} />
            </Tab>
            <Tab eventKey="allTasks" title="All Tasks">
              <TaskList tasks={tasks || []} />
            </Tab>
            <Tab eventKey="incompleteTasks" title="Incomplete Tasks">
              <TaskList tasks={tasks || []} />
            </Tab>
            <Tab eventKey="completedTasks" title="Completed Tasks">
              <TaskList tasks={tasks || []} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default DashboardView;
