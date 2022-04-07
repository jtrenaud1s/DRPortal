import React from "react";
import { Row, Col } from "react-bootstrap";
import StatCard, { IStatCardProps } from "./StatCard";

interface IStatRowProps {
  stats: IStatCardProps[];
}

const StatRow = ({ stats }: IStatRowProps) => {
  return (
    <Row>
      {stats &&
        stats.map((stat, id) => (
          <Col className="mb-3 mb-sm-3" key={id} xs={6} sm={6} lg={3}>
            <StatCard title={stat.title} value={stat.value} />
          </Col>
        ))}
    </Row>
  );
};

export default StatRow;
