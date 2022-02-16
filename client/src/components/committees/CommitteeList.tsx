import React from "react";
import { Committee } from "../../models/committee";
import CommitteeListItem from "./CommitteeListItem";

interface ICommitteesProps {
  committees: Committee[];
}

const CommitteeList = ({committees}: ICommitteesProps) => {
  return (
    <React.Fragment>
      {committees.length > 0 ? (
        committees.map((committee) => (
          <CommitteeListItem key={committee.id} committee={committee} />
        ))
      ) : (
        <div className="h4 text-muted m-5">Sorry, there aren't any committees right now!</div>
      )}
    </React.Fragment>
  );
};

export default CommitteeList;
