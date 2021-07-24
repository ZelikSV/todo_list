import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

import NewTodoForm from '../components/NewTodoForm/NewTodoForm';
import TodoList from '../components/TodoList/TodoList';
import Store from '../utils/store';
import { ITodoItem } from '../types';

const { Title } = Typography;
const Todo = () => {
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
      <Title>Todo List</Title>
      <NewTodoForm createTodoItem={createTodoItem} />
      <TodoList todos={todoState} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />
    </div>
  );
};

export default Todo;
