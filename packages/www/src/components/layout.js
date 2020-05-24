import React from "react";
import Header from "./header";
import { Container, Box } from "theme-ui";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
