import React, { useContext } from "react";
import { Container, Flex, Heading, Button, NavLink } from "theme-ui";
import { IdentityContext } from "../context/identity-context";
import Layout from "../components/layout";

export default (props) => {
  const { user } = useContext(IdentityContext);
  return (
    <Layout>
      <h1>Home page</h1>
    </Layout>
  );
};
