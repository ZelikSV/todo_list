import React, { FC, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { ITodoItem } from '../types';
import TodoList from './TodoList/TodoList';
import NewTodoForm from './NewTodoForm/NewTodoForm';
import Store from '../store';

const App: FC = () => {
  const api = new Store<ITodoItem>('todos', []);
  const [todoState, setTodoState] = useState<ITodoItem[]>([]);
  useEffect(() => {
    const todosList = api.getTodos;

    setTodoState(todosList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateData = (list: ITodoItem[]) => {
    api.setTodos(list);
    setTodoState(list);
  };

  const createTodoItem = (newTodo: ITodoItem) => {
    updateData([...todoState, newTodo]);
  };

  const removeTodoItem = (id: string) => () => {
    updateData(todoState.filter((item) => item.id !== id));
  };

  const updateTodoItem = (editedTodo: ITodoItem) => {
    const editedList = todoState.map((item) => {
      if (item.id === editedTodo.id) {
        return editedTodo;
      }

      return item;
    });
    updateData(editedList);
  };

  return (
    <div>
      <Typography variant="h5" component="h2">
        Todo List
      </Typography>
      <NewTodoForm createTodoItem={createTodoItem} />
      <TodoList todos={todoState} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />
    </div>
  );
};

export default App;
