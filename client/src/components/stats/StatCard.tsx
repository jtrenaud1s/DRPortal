import React from 'react'
import { Card } from 'react-bootstrap';

export interface IStatCardProps {
    title: string;
    value: any;
}

const StatCard = ({title, value}: IStatCardProps) => {
  return (
    <Card>
      <Card.Body>
        <span className="h6">{title}</span>
        <br />
        <span>{value}</span>
      </Card.Body>
    </Card>
  );
}

export default StatCard