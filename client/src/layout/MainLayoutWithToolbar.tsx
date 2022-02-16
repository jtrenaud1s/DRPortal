import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Toolbar from "./Toolbar";

interface IMainLayoutWithToolbarProps {
  title?: string;
  toolbarContent?: JSX.Element;
}

const MainLayoutWithToolbar: React.FC<IMainLayoutWithToolbarProps> = ({ children, title, toolbarContent }) => {
  return (
    <div>
      <Header />
      <Toolbar >
        {toolbarContent}
      </Toolbar>
      {title && <h1>{title}</h1>}
      <Container>{children}</Container>
    </div>
  );
};

export default MainLayoutWithToolbar;
