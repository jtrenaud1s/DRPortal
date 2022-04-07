import React from "react";
import { Badge, Button, ButtonGroup, Card } from "react-bootstrap";
import { EyeFill, TrashFill } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import { Task } from "../../models/task";

interface ITaskListItemProps {
  task: Task;
}

const getBadgeColor = (priority: string) => {
  switch (priority) {
    case "Low Priority":
      return "success";
    case "Normal Priority":
      return "warning";
    case "High Priority":
      return "error";
  }
};

const TaskListItem = ({ task }: ITaskListItemProps) => (
  <Card className="shadow-sm mb-2">
    <Card.Body>
      <span className="d-flex justify-content-between align-items-top">
        <span className="h6">{task.name}</span>
        <span className="ms-4">
          <Badge bg={getBadgeColor(task.priority)}>{task.priority}</Badge>
        </span>
      </span>

      <div>
        <small className="text-muted">
          <strong>Due Date: </strong>
        </small>
        <small>{task.due_date ? new Date(task.due_date).toLocaleString("en-US") : "None"}</small>
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
      <div>
        <small>{task.description}</small>
      </div>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <small className="text-muted">
        <strong>Status: </strong>
        {`${task.status}`}
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
