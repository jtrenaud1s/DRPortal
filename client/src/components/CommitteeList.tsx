import React from "react";
import { Committee, CommitteeRenderable } from "../models/committee";
import { User } from "../models/user";
import CommitteeListItem from "./CommitteeListItem";

interface ICommitteesProps {
  committees: Committee[];
  users: User[];
}

const CommitteeList = (props: ICommitteesProps) => {
  const committees: CommitteeRenderable[] = props.committees.map(
    (committee) => {
      const head: User = props.users.find(
        (user) => user.id === committee.head
      ) as User;
      const members: User[] = props.users.filter((user) =>
        committee.members.includes(user.id!)
      ) as User[];
      return {
        id: committee.id,
        name: committee.name,
        head: head,
        members: members,
      };
    }
  );

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
