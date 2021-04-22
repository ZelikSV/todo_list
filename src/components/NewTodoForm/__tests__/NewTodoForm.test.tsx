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

  it('NewTodoForm should include new text', () => {
    const { getByRole, getByTestId } = render(<NewTodoForm createTodoItem={createItem} />);

    fireEvent.change(getByRole('textbox'), { target: { value: 'New todo item' } });

    fireEvent.click(getByTestId('submit-btn'));
    expect(createItem).toHaveBeenCalledTimes(1);
  });
});
