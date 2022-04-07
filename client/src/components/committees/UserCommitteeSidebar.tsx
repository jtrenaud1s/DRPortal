import React from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { User } from "../../models/user";
import {
  useFetchCommitteesByHeadQuery,
  useFetchCommitteesByMemberQuery,
} from "../../services/committeeService";
import { useAppSelector } from "../../store";

const UserCommitteeSidebar = () => {
  const user = useAppSelector((state) => state.auth.currentUser) as User;
  const {
    data: headCommittees,
    error: hError,
    isLoading: hIsLoading,
  } = useFetchCommitteesByHeadQuery(user.id!);
  const {
    data: memCommittees,
    error: mError,
    isLoading: mIsLoading,
  } = useFetchCommitteesByMemberQuery(user.id!);

  const isLoading = hIsLoading || mIsLoading;

  const memberCommittees = memCommittees?.filter(
    (a) => !headCommittees?.map((b) => b.id).includes(a.id)
  );

  return (
    <Card className="mb-3 sticky-lg-top-margin">
      <Card.Header>Your Committees</Card.Header>
      {isLoading ? (
        <Card.Body className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" color="azure" />
        </Card.Body>
      ) : hError || mError ? (
        <Card.Body className="d-flex justify-content-center align-items-center">
          {`${hError}${mError}`}
        </Card.Body>
      ) : (
        <ListGroup variant="flush">
          {headCommittees &&
            headCommittees.map((committee, id) => (
              <ListGroup.Item key={id} className="d-flex align-items-center">
                <StarFill className="me-2" />
                {committee.name}
              </ListGroup.Item>
            ))}
          {memCommittees &&
            memberCommittees?.map((committee, id) => (
              <ListGroup.Item key={id}>{committee.name}</ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </Card>
  );
};

export default UserCommitteeSidebar;
