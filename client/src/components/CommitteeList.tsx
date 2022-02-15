import React from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { Committee } from "../models/committee";
import { User } from "../models/user";
import { useFetchAllCommitteesQuery } from "../services/apiService";
import { useAppSelector } from "../store";

const CommitteeList = () => {
  const user = useAppSelector((state) => state.auth.currentUser) as User;
  const { data, error, isLoading } = useFetchAllCommitteesQuery();
  const userCommittees = data?.filter(
    (committee) =>
      committee.head === user.id! || committee.members.includes(user.id!)
  ) as Committee[];
  return (
    <Card>
      <Card.Header>Your Committees</Card.Header>
      {error ? (
        <>{error}</>
      ) : isLoading ? (
        <Spinner animation="border" color="azure" />
      ) : data ? (
        <ListGroup variant="flush">
          {userCommittees.map((committee, id) => (
            <ListGroup.Item key={id}>{committee.name}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </Card>
  );
};

export default CommitteeList;
