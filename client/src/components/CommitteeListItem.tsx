import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { EyeFill, TrashFill } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import { Committee } from "../models/committee";

interface ICommitteeListItemProps {
  committee: Committee;
}

const CommitteeListItem = ({ committee }: ICommitteeListItemProps) => (
  <Card className="shadow-sm mb-2">
    <Card.Body>
      <div className="d-flex justify-content-between">
        <span className="h5">{committee.name}</span>
        <small className="text-muted">{committee.members.length} Members</small>
      </div>
      <div className="d-flex justify-content-between">
        <span>
          <small>
            <strong className="text-muted">Head: </strong>
          </small>
          <small>
            {committee.head.first_name + " " + committee.head.last_name}
          </small>
        </span>
      </div>
      <div>
        <small className="text-muted"><strong>Members: </strong></small>
        <span>
          <small>
            {committee.members
              .map((member) => member.first_name + " " + member.last_name)
              .join(", ")}
          </small>
        </span>
      </div>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end">
      <ButtonGroup>
        <LinkContainer to={`/committee/${committee.id}`}>
          <Button size="sm" className="d-flex align-items-center">
            <EyeFill className="me-1" />
            Details
          </Button>
        </LinkContainer>
        <LinkContainer to={`/committee/${committee.id}`}>
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

export default CommitteeListItem;
