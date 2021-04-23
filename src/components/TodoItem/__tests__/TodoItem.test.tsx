import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ITodoItem, TodoStatus } from '../../../types';
import TodoItem from '../TodoItem';

describe('TodoItem component tests', () => {
  const removeTodoItem = jest.fn();
  const updateTodoItem = jest.fn();
  const item: ITodoItem = {
    id: 'simple-id',
    text: 'Some todo',
    createdAt: '2021-04-22T07:32:07.663Z',
    status: TodoStatus.READ,
  };

  it('TodoItem is visible', () => {
    const { getByTestId } = render(
      <TodoItem itemData={item} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />,
    );

    expect(getByTestId('todo-item')).toBeInTheDocument();
  });

  it('TodoItem include status read', () => {
    const { getByTestId } = render(
      <TodoItem itemData={item} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />,
    );

    expect(getByTestId('IconBtn__edit')).toBeInTheDocument();
    expect(getByTestId('IconBtn__delete')).toBeInTheDocument();
  });

  it('TodoItem include status edit', () => {
    const { getByTestId } = render(
      <TodoItem
        itemData={{ ...item, status: TodoStatus.EDIT }}
        removeTodoItem={removeTodoItem}
        updateTodoItem={updateTodoItem}
      />,
    );

    expect(getByTestId('IconBtn__save')).toBeInTheDocument();
  });

  it('TodoItem should change status from read to edit', () => {
    const { getByTestId } = render(
      <TodoItem itemData={item} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />,
    );

    fireEvent.click(getByTestId('IconBtn__edit'));

    expect(getByTestId('IconBtn__save')).toBeInTheDocument();
  });

  it('updateTodoItem should be called on save', () => {
    const { getByTestId } = render(
      <TodoItem
        itemData={{ ...item, status: TodoStatus.EDIT }}
        removeTodoItem={removeTodoItem}
        updateTodoItem={updateTodoItem}
      />,
    );

    fireEvent.click(getByTestId('IconBtn__save'));
    expect(updateTodoItem).toHaveBeenCalledTimes(1);
  });

  it('TodoItem should be editable', () => {
    const { getByTestId } = render(
      <TodoItem
        itemData={{ ...item, status: TodoStatus.EDIT }}
        removeTodoItem={removeTodoItem}
        updateTodoItem={updateTodoItem}
      />,
    );

    fireEvent.change(getByTestId('edit-field'), {
      target: {
        value: 'Some test',
      },
    });

    expect(getByTestId('edit-field')).toHaveValue('Some test');
  });

  it('TextInput should not be empty', () => {
    const { getByTestId } = render(
      <TodoItem
        itemData={{ ...item, status: TodoStatus.EDIT }}
        removeTodoItem={removeTodoItem}
        updateTodoItem={updateTodoItem}
      />,
    );

    fireEvent.change(getByTestId('edit-field'), {
      target: {
        value: '',
      },
    });

    fireEvent.click(getByTestId('IconBtn__save'));

    expect(getByTestId('todo-item')).toHaveTextContent('Field can not be empty');
  });

  it('RemoveTodoItem should be called on delete', () => {
    const { getByTestId } = render(
      <TodoItem itemData={item} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />,
    );

    fireEvent.click(getByTestId('IconBtn__delete'));
    expect(removeTodoItem).toHaveBeenCalledTimes(1);
  });
});
