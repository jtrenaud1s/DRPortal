import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";

interface IMainLayoutProps {
  title?: string;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Header />
      {title && <h1>{title}</h1>}
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default MainLayout;
