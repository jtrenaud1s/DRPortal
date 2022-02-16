import React from "react";
import { Button } from "react-bootstrap";
import {
  useFetchAllCommitteesQuery,
  useFetchAllUsersQuery,
} from "../../services/apiService";
import CommitteeList from "../../components/CommitteeList";
import MainLayoutWithToolbar from "../../layout/MainLayoutWithToolbar";
import { LinkContainer } from "react-router-bootstrap";

const CommitteeListView = () => {
  const {
    data: committees,
    error: cError,
    isLoading: cIsLoading,
  } = useFetchAllCommitteesQuery();
  const {
    data: users,
    error: uError,
    isLoading: uIsLoading,
  } = useFetchAllUsersQuery();

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

  return (
    <MainLayoutWithToolbar toolbarContent={newCommitteeButton}>
      {cError || uError ? (
        <>error</>
      ) : cIsLoading || uIsLoading ? (
        <>Loading...</>
      ) : committees && users ? (
        <React.Fragment>
          <CommitteeList users={users} committees={committees} />
        </React.Fragment>
      ) : null}
    </MainLayoutWithToolbar>
  );
};

export default CommitteeListView;
