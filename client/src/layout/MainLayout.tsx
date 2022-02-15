import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

interface IMainLayoutProps {
    title?: string
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Header />
      { title && <h1>{title}</h1> }
      <Container>{children}</Container>
    </div>
  );
};

export default MainLayout;
