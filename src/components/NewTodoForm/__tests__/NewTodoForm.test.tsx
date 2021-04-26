import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewTodoForm from '../NewTodoForm';

describe('NewTodoForm component tests', () => {
  const createItem = jest.fn();

  it('NewTodoForm is visible', () => {
    render(<NewTodoForm createTodoItem={createItem} />);

    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
  });

  it('CreateItem should be called ones', () => {
    const { getByRole, getByTestId } = render(<NewTodoForm createTodoItem={createItem} />);

    fireEvent.change(getByRole('textbox'), { target: { value: 'New todo item' } });

    fireEvent.click(getByTestId('submit-btn'));
    expect(createItem).toHaveBeenCalledTimes(1);
  });

  it('NewTodoForm should include new text', () => {
    const { getByTestId } = render(<NewTodoForm createTodoItem={createItem} />);

    fireEvent.change(getByTestId('new-todo-field'), {
      target: {
        value: 'New todo item',
      },
    });

    expect(getByTestId('new-todo-field')).toHaveValue('New todo item');
  });

  it('NewTodoForm should not be empty', () => {
    const { getByTestId } = render(<NewTodoForm createTodoItem={createItem} />);

    fireEvent.change(getByTestId('new-todo-field'), {
      target: {
        value: '',
      },
    });
    fireEvent.click(getByTestId('submit-btn'));

    expect(getByTestId('todo-form')).toHaveTextContent('Field can not be empty');
  });

  it('NewTodoForm should be empty after submit event', () => {
    const { getByTestId } = render(<NewTodoForm createTodoItem={createItem} />);

    fireEvent.change(getByTestId('new-todo-field'), {
      target: {
        value: 'Some test',
      },
    });

    fireEvent.click(getByTestId('submit-btn'));

    expect(getByTestId('new-todo-field')).toHaveValue('');
  });
});
