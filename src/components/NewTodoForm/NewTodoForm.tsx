import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Error, ITodoItem, TodoStatus } from '../../types';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },
  todoText: {
    width: '60%',
    marginRight: 10,
  },
}));

type Props = {
  createTodoItem: (item: ITodoItem) => void;
};

const NewTodoForm: FC<Props> = ({ createTodoItem }) => {
  const [todoText, setTodoText] = useState<string | null>(null);
  const [{ isError, message }, setError] = useState<Error>({
    isError: false,
    message: '',
  });
  const classes = useStyles();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!todoText) {
      setError({
        isError: true,
        message: 'Field can not be empty',
      });

      return;
    }

    createTodoItem({
      id: uuidv4(),
      text: todoText,
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
      status: TodoStatus.READ,
    });

    setTodoText(null);
    (e.currentTarget as HTMLFormElement).reset();
  };

  const handleTodoText = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodoText(evt.currentTarget.value);
    setError({
      isError: false,
      message: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form} data-testid="todo-form">
      <TextField
        inputProps={{
          'data-testid': 'new-todo-field',
        }}
        error={isError}
        className={classes.todoText}
        label="Todo"
        name="todo"
        onChange={handleTodoText}
        helperText={message}
      />

      <Button type="submit" variant="contained" color="primary" data-testid="submit-btn">
        Add
      </Button>
    </form>
  );
};

export default NewTodoForm;
