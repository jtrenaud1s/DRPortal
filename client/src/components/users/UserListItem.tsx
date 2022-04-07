import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { EyeFill, TrashFill } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import { User } from "../../models/user";

interface IUserListItemProps {
  user: User;
}

const UserListItem = ({ user }: IUserListItemProps) => (
  //Query user's committees
  <Card className="shadow-sm mb-2">
    <Card.Body>
      <div className="d-flex justify-content-between">
        <span className="h5">{`${user.first_name} ${user.last_name}`}</span>
        <small className="text-muted">ΓΕ{user.initiation_number}</small>
      </div>
      <div className="d-flex justify-content-between">
        <span>
          <small>
            <strong className="text-muted">@{user.username}</strong>
          </small>
        </span>
      </div>
      {/* <div>
        <small className="text-muted">
          <strong>Committees: </strong>
        </small>
        <span>
          <small>
            {committee.members
              .map((member) => member.first_name + " " + member.last_name)
              .join(", ")}
          </small>
        </span>
      </div> */}
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end">
      <ButtonGroup>
        <LinkContainer to={`/users/${user.id}`}>
          <Button size="sm" className="d-flex align-items-center">
            <EyeFill className="me-1" />
            Details
          </Button>
        </LinkContainer>
        <LinkContainer to={`/users/${user.id}`}>
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

export default UserListItem;
