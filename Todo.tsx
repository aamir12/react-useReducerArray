import * as React from 'react';
import { Action } from './App';
const { Fragment } = React;
export default function Todo({ todo, dispatch }) {
  return (
    <Fragment>
      <div>
        <span style={{ backgroundColor: todo.isComplete ? 'green' : 'red' }}>
          {todo.name}
        </span>

        <button
          type="button"
          onClick={() =>
            dispatch({
              type: Action.TOGGLE_COMPLETE,
              payload: { id: todo.id },
            })
          }
        >
          Toggle
        </button>

        <button
          type="button"
          onClick={() =>
            dispatch({
              type: Action.DELETE_TODO,
              payload: { id: todo.id },
            })
          }
        >
          Delete
        </button>
      </div>
    </Fragment>
  );
}
