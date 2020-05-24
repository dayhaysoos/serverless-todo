import React, { useRef, useContext, useReducer } from "react";
import Layout from "./layout";
import { Flex, Label, Input, Button, Checkbox } from "theme-ui";
import { IdentityContext } from "../context/identity-context";

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

  return (
    <Layout>
      <Flex
        as={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "addTodo", payload: inputRef.current.value });
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
        {todos.map((todo, i) => (
          <Flex as={"li"} key={i}>
            <Checkbox checked={todo.done} />
            <span>{todo.value}</span>
          </Flex>
        ))}
      </Flex>
    </Layout>
  );
};

export default Dashbaord;
