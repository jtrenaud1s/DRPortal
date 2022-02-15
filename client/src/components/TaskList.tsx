import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Committee } from "../models/committee";
import { Task, TaskDataTableView } from "../models/task";
import { User } from "../models/user";

interface ITasksProps {
  tasks: Task[];
  committees: Committee[];
  users: User[];
}
// created, updated, assignees
const HEADERS = [
  {
    prop: "name" as keyof TaskDataTableView,
    title: "Name",
    isFilterable: true,
  },
  {
    prop: "committee" as keyof TaskDataTableView,
    title: "Committee",
    isFilterable: true,
  },
  {
    prop: "assignees" as keyof TaskDataTableView,
    title: "Assigned To",
    isFilterable: true,
  },
  {
    prop: "created" as keyof TaskDataTableView,
    title: "Created",
    isFilterable: false,
  },
  {
    prop: "updated" as keyof TaskDataTableView,
    title: "Last Updated",
    isFilterable: false,
  },
];

const TaskList = (props: ITasksProps) => {
  const body: TaskDataTableView[] = props.tasks.map((task) => {
    const committee: Committee = props.committees.find(
      (committee) => committee.id === task.id
    ) as Committee;

    const assignees: User[] = props.users.filter((user) =>
      task.assignees.includes(user.id!)
    ) as User[];
    return {
      name: task.name,
      committee: committee?.name,
      created: new Date(task.created.toString()).toLocaleString("en-US"),
      updated: new Date(task.updated.toString()).toLocaleString("en-US"),
      assignees: assignees
        .map((user) => user.first_name + " " + user.last_name)
        .join(", "),
    };
  });

  return (
    <div>
      {props.tasks.length > 0 ? (
        <DatatableWrapper
          body={body}
          headers={HEADERS}
          paginationOptionsProps={{
            initialState: {
              rowsPerPage: 10,
              options: [5, 10, 15, 20],
            },
          }}>
          <Row className="mb-4 mt-4">
            <Col
              xs={12}
              lg={4}
              className="">
              <Filter />
            </Col>
          </Row>
          <Table>
            <TableHeader />
            <TableBody />
          </Table>
          <Row>
            <Col
              xs={12}
              sm={6}
              lg={4}
              className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0">
              <PaginationOptions alwaysShowPagination={false} />
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={8}
              className="d-flex flex-col justify-content-end align-items-end">
              <Pagination alwaysShowPagination={false} />
            </Col>
          </Row>
        </DatatableWrapper>
      ) : (
        <div>Sorry, there aren't any tasks right now!</div>
      )}
    </div>
  );
};

export default TaskList;
