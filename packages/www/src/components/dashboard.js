import React, { useRef, useContext, useReducer } from "react";
import Layout from "./layout";
import { Flex, Label, Input, Button, Checkbox, Box } from "theme-ui";
import { IdentityContext } from "../context/identity-context";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    addTodo(id: $id) {
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
  const [todos, dispatch] = useReducer(todosReducer, []);
  const inputRef = useRef();
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  return (
    <Layout>
      <Box padding={3}>
        <Flex
          as="form"
          onSubmit={async (e) => {
            e.preventDefault();
            await addTodo({ variables: { text: inputRef.current.value } });
            inputRef.current.value = "";
            await refetch();
          }}
        >
          <Label sx={{ display: "flex" }}>
            <span>Add&nbsp;Todo</span>
            <Input ref={inputRef} sx={{ marginLeft: 1 }} />
          </Label>
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
        </Flex>
        <Flex sx={{ flexDirection: "column" }}>
          {loading ? <div>loading...</div> : null}
          {error ? <div>{error.message}</div> : null}
          {!loading && !error && (
            <ul sx={{ listStyleType: "none" }}>
              {data.todos.map((todo) => (
                <Flex
                  key={todo.id}
                  as="li"
                  onClick={async () => {
                    console.log("updateTodoDone");
                    await updateTodoDone({ variables: { id: todo.id } });
                    console.log("refetching");
                    await refetch();
                  }}
                >
                  <Checkbox checked={todo.done} readOnly />
                  <span>{todo.text}</span>
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
