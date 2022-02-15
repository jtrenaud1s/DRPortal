import React from "react";
import { Row, Col } from "react-bootstrap";
import StatCard, { IStatCardProps } from "./StatCard";

interface ITaskStatRowProps {
  stats: IStatCardProps[];
}

const TaskStatRow = ({ stats }: ITaskStatRowProps) => {
  return (
    <Row>
      {stats &&
        stats.map((stat, id) => (
          <Col key={id}>
            <StatCard title={stat.title} value={stat.value} />
          </Col>
        ))}
    </Row>
  );
};

export default TaskStatRow;
