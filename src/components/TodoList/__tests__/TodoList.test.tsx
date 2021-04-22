import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import TodoList from '../TodoList';
import { ITodoItem, TodoStatus } from '../../../types';

describe('TodoList component tests', () => {
  const removeTodoItem = jest.fn();
  const updateTodoItem = jest.fn();
  const todosList: ITodoItem[] = [];

  it('TodoList is visible', () => {
    const { getByTestId } = render(
      <TodoList todos={todosList} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />,
    );

    expect(getByTestId('todo-list')).toBeInTheDocument();
  });

  it('TodoList should be empty', () => {
    const { getByTestId } = render(
      <TodoList todos={todosList} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />,
    );

    expect(getByTestId('todo-list')).toHaveTextContent('Empty Data');
  });

  it('TodoList include todos', () => {
    const todos = [
      {
        id: 'simple-id',
        text: 'Some todo',
        createdAt: '2021-04-22T07:32:07.663Z',
        status: TodoStatus.READ,
      },
    ];
    const { getByTestId } = render(
      <TodoList todos={todos} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />,
    );

    expect(getByTestId('todo-item')).toHaveTextContent('Some todo');
  });
});
