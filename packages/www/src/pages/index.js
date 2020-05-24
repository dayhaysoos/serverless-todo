import React from "react";
import { Container, Heading, Flex, Button } from "theme-ui";
import Layout from "../components/layout";

export default (props) => (
  <Layout>
    <Flex padding={3} sx={{ flexDirection: "column" }}>
      <Heading as="h1">Get Stuff done</Heading>
      <h1>Our site</h1>
      <Button onClick={() => alert("log in")}>Hi</Button>
    </Flex>
  </Layout>
);
