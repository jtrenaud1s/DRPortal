import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import TaskList from "../../components/TaskList";
import MainLayout from "../../layout/MainLayout";
import { useFetchAllTasksQuery } from "../../services/apiService";
import { useAppSelector } from "../../store";

const TaskListView = () => {
  const { data, error, isLoading } = useFetchAllTasksQuery();
  const userId = useAppSelector(state => state.auth.currentUser)
  return (
    <MainLayout>
      {error ? (
        <>error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <React.Fragment>
          <Row className="mt-4">
            <Col>
              <Card>
                <Card.Body>
                  <span className="h5">All Tasks</span>
                  <br />
                  <span>{data.length}</span>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <span className="h5">Your Tasks</span>
                  <br />
                  <span>{data.length}</span>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <span className="h5">Incomplete Tasks</span>
                  <br />
                  <span>{data.length}</span>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <span className="h5">Completed Tasks</span>
                  <br />
                  <span>{data.length}</span>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <TaskList tasks={data} />
        </React.Fragment>
      ) : null}
    </MainLayout>
  );
};

export default TaskListView;
