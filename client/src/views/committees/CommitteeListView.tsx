import React from "react";
import { Alert, Button } from "react-bootstrap";
import {
  useFetchAllCommitteesQuery,
} from "../../services/apiService";
import CommitteeList from "../../components/committees/CommitteeList";
import MainLayoutWithToolbar from "../../layout/MainLayoutWithToolbar";
import { LinkContainer } from "react-router-bootstrap";
import Loadscreen from "../../components/Loadscreen";

const CommitteeListView = () => {
  const { data: committees, error, isLoading } = useFetchAllCommitteesQuery();

  const newCommitteeButton = (
    <LinkContainer to="">
      <Button
        size="sm"
        variant="default"
        className="border-end border-start rounded-0">
        Create Committee
      </Button>
    </LinkContainer>
  );

  if (isLoading) return <Loadscreen />;

  return (
    <MainLayoutWithToolbar toolbarContent={newCommitteeButton}>
      {error && <Alert>{`${error}`}</Alert>}

      <CommitteeList committees={committees || []} />
    </MainLayoutWithToolbar>
  );
};

export default CommitteeListView;
