import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { EyeFill, TrashFill } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import { Task } from "../../models/task";

interface ITaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: ITaskListItemProps) => (
  <Card className="shadow-sm mb-2">
    <Card.Body>
      <div className="h6">{task.name}</div>
      <div>
        <small>{task.description}</small>
      </div>
      <div>
        <small className="text-muted">
          <strong>Assigned To: </strong>
        </small>
        <small>
          {task.assignees
            .map((member) => member.first_name + " " + member.last_name)
            .join(", ")}
        </small>
      </div>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <small className="text-muted">
        <strong>Created by </strong>
        {`${task.creator.first_name} ${task.creator.last_name}`}
      </small>

      <ButtonGroup className="ms-3">
        <LinkContainer to={`/tasks/${task.id}`}>
          <Button size="sm" className="d-flex align-items-center">
            <EyeFill className="me-1" />
            Details
          </Button>
        </LinkContainer>
        <LinkContainer to={`/tasks/${task.id}`}>
          <Button
            variant="danger"
            size="sm"
            className="d-flex align-items-center">
            <TrashFill className="me-1" />
            Delete
          </Button>
        </LinkContainer>
      </ButtonGroup>
    </Card.Footer>
  </Card>
);

export default TaskListItem;
