import React, { useRef, useContext, useReducer } from "react";
import Layout from "./layout";
import { Flex, Label, Input, Button, Checkbox, Box } from "theme-ui";
import { IdentityContext } from "../context/identity-context";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: "hi") {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    addTodo(text: "hi") {
      text
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [...state, { done: false, value: action.payload }];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      return newState;
  }
};

const Dashbaord = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(ADD_TODO);
  const inputRef = useRef();
  const { loading, error, data } = useQuery(GET_TODOS);

  return (
    <Layout>
      <Box padding={3}>
        <Flex
          as={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            addTodo({ variables: { text: inputRef.current.value } });
            inputRef.current.value = "";
          }}
        >
          <Label>
            Add ToDo
            <Input ref={inputRef} />
          </Label>
          <Button>Submit</Button>
        </Flex>
        <Flex sx={{ flexDirection: "column" }}>
          {loading ? <div>loading ...</div> : null}
          {error ? <div>{error.message}</div> : null}
          {!loading && !error && (
            <ul sx={{ listStyleType: "none" }}>
              {data.todos.map((todo) => (
                <Flex
                  as={"li"}
                  key={todo.id}
                  onClick={updateTodoDone({ variables: { id: todo.id } })}
                >
                  <Checkbox checked={todo.done} />
                  <span>{todo.value}</span>
                </Flex>
              ))}
            </ul>
          )}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Dashbaord;
