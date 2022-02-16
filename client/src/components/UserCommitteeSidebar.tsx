import React from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { Committee } from "../models/committee";
import { User } from "../models/user";
import { useFetchAllCommitteesQuery } from "../services/apiService";
import { useAppSelector } from "../store";

const UserCommitteeSidebar = () => {
  const user = useAppSelector((state) => state.auth.currentUser) as User;
  const { data, error, isLoading } = useFetchAllCommitteesQuery();
  const userCommittees = data?.filter(
    (committee) =>
      committee.head.id === user.id! ||
      committee.members.map((member) => member.id).includes(user.id!)
  ) as Committee[];
  return (
    <Card className="mb-3 sticky-lg-top-margin">
      <Card.Header>Your Committees</Card.Header>
      {isLoading ? (
        <Card.Body className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" color="azure" />
        </Card.Body>
      ) : error ? (
        <Card.Body className="d-flex justify-content-center align-items-center">
          {`${error}`}
        </Card.Body>
      ) : (
        <></>
      )}

      {data && (
        <ListGroup variant="flush">
          {userCommittees.map((committee, id) => (
            <ListGroup.Item key={id}>{committee.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Card>
  );
};

export default UserCommitteeSidebar;
