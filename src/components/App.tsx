import React, { FC, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { ITodoItem } from '../types';
import TodoList from './TodoList/TodoList';
import NewTodoForm from './NewTodoForm/NewTodoForm';

const App: FC = () => {
  const [todoState, setTodoState] = useState<ITodoItem[]>([]);
  useEffect(() => {
    const todosList = localStorage.getItem('todos')
      ? (JSON.parse(localStorage.getItem('todos') as string) as ITodoItem[])
      : [];

    setTodoState(todosList);
  }, []);

  const createTodoItem = (newTodo: ITodoItem) => {
    localStorage.setItem('todos', JSON.stringify([...todoState, newTodo]));
    setTodoState([...todoState, newTodo]);
  };

  const removeTodoItem = (id: string) => () => {
    const clearedList = todoState.filter((item) => item.id !== id);

    localStorage.setItem('todos', JSON.stringify(clearedList));
    setTodoState(clearedList);
  };

  const editTodoItem = (editedTodo: ITodoItem) => {
    const editedList = todoState.map((item) => {
      if (item.id === editedTodo.id) {
        return editedTodo;
      }

      return item;
    });

    localStorage.setItem('todos', JSON.stringify(editedList));
    setTodoState(editedList);
  };

  return (
    <div>
      <Typography variant="h5" component="h2">
        Todo List
      </Typography>
      <NewTodoForm createTodoItem={createTodoItem} />
      <TodoList todos={todoState} removeTodoItem={removeTodoItem} editTodoItem={editTodoItem} />
    </div>
  );
};

export default App;
