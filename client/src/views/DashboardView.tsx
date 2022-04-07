import React from "react";
import { Alert, Col, Row, Tab, Tabs } from "react-bootstrap";
import UserCommitteeSidebar from "../components/committees/UserCommitteeSidebar";
import TaskList from "../components/tasks/TaskList";
import StatRow from "../components/stats/StatRow";
import MainLayout from "../layout/MainLayout";
import { Task } from "../models/task";
import { User } from "../models/user";
import { useFetchAllTasksQuery } from "../services/taskService";
import { useAppSelector } from "../store";
import Loadscreen from "../components/Loadscreen";

const DashboardView = () => {
  const { data: tasks, error, isLoading } = useFetchAllTasksQuery();
  const user = useAppSelector((state) => state.auth.currentUser) as User;

  const userTasks = tasks?.filter((task) =>
    task.assignees.map((assignee) => assignee.id).includes(user.id!)
  ) as Task[];

  const openTasks = tasks?.filter((task) => task.status === "Open") as Task[];
  const incompleteTasks = tasks?.filter((task) => task.status !== "Completed")
  const overdueTasks = tasks?.filter(task => task.due_date && new Date(task.due_date) < new Date()) as Task[];

  const stats = [
    { title: "All Tasks", value: tasks?.length },
    { title: "Your Tasks", value: userTasks?.length },
    { title: "Open Tasks", value: openTasks?.length },
    { title: "Overdue Tasks", value: overdueTasks?.length },
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
              <TaskList tasks={incompleteTasks || []} />
            </Tab>
            <Tab eventKey="overdueTasks" title="Overdue Tasks">
              <TaskList tasks={overdueTasks || []} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default DashboardView;
