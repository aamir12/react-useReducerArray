import * as React from 'react';
const { useReducer, useState, Fragment } = React;
import Todo from './Todo';

/**
 * useReducer is use to manage complex state;
 * inside the useReducer we pass two argument reducer function and default state;
 * inside the reducer function. two argument are use state and action.;
 * action has type and payload property;
 * to call reducer we dispath function i.e. return by useReducer
 */
export enum Action {
  ADD_TODO = '[todo] add todo',
  TOGGLE_COMPLETE = '[todo] toggle complete',
  DELETE_TODO = '[todo] delete todo',
}

function reducer(todos, action) {
  switch (action.type) {
    case Action.ADD_TODO:
      return [...todos, generateTodo(action.payload.name)];
    case Action.TOGGLE_COMPLETE:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    case Action.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function generateTodo(name) {
  return {
    id: Date.now(),
    name,
    isComplete: false,
  };
}

export default function App() {
  const [name, setName] = useState('');
  const [todos, dispatch] = useReducer(reducer, []);
  console.log(todos);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: Action.ADD_TODO, payload: { name } });
    setName('');
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </Fragment>
  );
}
