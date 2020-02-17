import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import "./App.css"
import {createAdd, createRemove, createSet, createToggle} from "./actions";

let idSeq = Date.now();

function bindActionCreators(actionCreators, dispatch) {
  const ret = {};

  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispatch(action)
    }
  }
  console.log(ret)
  return ret;
}

const Control = memo(function Control(props) {
  const {addTodo} = props;
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();
    if (newText.length) {
      addTodo({
        id: ++idSeq,
        text: newText,
        complete: false,
      });
      inputRef.current.value = ""
    }
  };

  return <div className="control">
    <h1>todos</h1>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        ref={inputRef}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </div>
});

const TodoItem = memo(function TodoItem(props) {
  const {
    todo: {
      id,
      text,
      complete
    },
    removeTodo,
    toggleTodo
  } = props;

  const onChange = () => {
    toggleTodo(id)
  }

  const onRemove = () => {
    removeTodo(id)
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        onChange={onChange}
        checked={complete}
      />
      <label className={complete ? "complete" : ""}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const {todos, removeTodo, toggleTodo} = props;
  return (
    <ul>
      {
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />
        ))
      }
    </ul>
  )
})

const LS_KEY = '_$-todos_';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    dispatch(createSet(todos))
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos]);

  /*const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter((todo) => {
      return todo.id !== id;
    }))
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id ? {
        ...todo,
        complete: !todo.complete
      } : todo
    }))
  }, []);*/

  function reducer(state, action) {
    const {type, payload} = action;
    const {todos, incrementCount} = state;
    switch (type) {
      case "set":
        return {
          ...state,
          todos: payload,
          incrementCount: incrementCount + 1
        };
      case "add":
        return {
          ...state,
          todos: [...todos, payload],
          incrementCount: incrementCount + 1
        };
      case "remove":
        return {
          ...state,
          todos: todos.filter((todo) => {
            return todo.id !== payload;
          }),
        };
      case "toggle":
        return {
          ...state,
          todos: todos.map(todo => {
            return todo.id === payload ? {
              ...todo,
              complete: !todo.complete
            } : todo
          }),
        };
      default:
        return state;
    }
  }

  const dispatch = useCallback((action) => {
    const state = {
      todos,
      incrementCount
    };

    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    };

    const newState = reducer(state, action);

    for (let key in newState) {
      setters[key](newState[key])
    }

  }, [todos, incrementCount]);

  return (
    <div className="todo-list">
      <Control
        {
          ...bindActionCreators({
            addTodo: createAdd
          }, dispatch)
        }
      />
      <Todos
        {
          ...bindActionCreators({
            removeTodo: createRemove,
            toggleTodo: createToggle,
          }, dispatch)
        }
        todos={todos}
      />
    </div>
  )
}

export default TodoList;

