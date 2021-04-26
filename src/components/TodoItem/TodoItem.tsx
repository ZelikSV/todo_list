import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { Error, ITodoItem, TodoStatus } from '../../types';
import { dateFormat } from '../../constants';
import IconButton from '../IconButton/IconButton';

type Props = {
  itemData: ITodoItem;
  removeTodoItem: () => void;
  updateTodoItem: (editedTodo: ITodoItem) => void;
};

const useStyles = makeStyles(() => ({
  todoWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    marginLeft: 'auto',
  },
  editInput: {
    width: '100%',
  },
}));

const TodoItem: FC<Props> = ({ itemData, removeTodoItem, updateTodoItem }) => {
  const classes = useStyles();
  const [todoItem, setTodoItem] = useState<ITodoItem>(itemData);
  const [text, setText] = useState('');
  const [{ isError, message }, setError] = useState<Error>({
    isError: false,
    message: '',
  });

  useEffect(() => {
    setTodoItem(itemData);
    setText(todoItem.text);
  }, [itemData, todoItem.text]);

  const saveUpdatedTodo = () => {
    if (!text) {
      setError({
        isError: true,
        message: 'Field can not be empty',
      });

      return;
    }

    updateTodoItem({
      ...itemData,
      text,
      updatedAt: new Date().toISOString(),
      status: TodoStatus.READ,
    });
  };

  const handleTodoText = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(evt.target.value);
    setError({
      isError: false,
      message: '',
    });
  };

  const handleTodoEdit = () => {
    setTodoItem((prevState) => ({ ...prevState, status: TodoStatus.EDIT }));
  };

  const todoDate = useMemo(
    () =>
      itemData.updatedAt ? dayjs(itemData.updatedAt).format(dateFormat) : dayjs(itemData.createdAt).format(dateFormat),
    [itemData],
  );

  const todoItemContent = {
    [TodoStatus.READ]: (
      <>
        <span>{itemData.text}</span>
        <div className={classes.controls}>
          <span data-testid="todo-item-time">{todoDate}</span>
          <IconButton color="primary" type="edit" clickHandler={handleTodoEdit} />
          <IconButton color="secondary" type="delete" clickHandler={removeTodoItem} />
        </div>
      </>
    ),
    [TodoStatus.EDIT]: (
      <>
        <TextField
          inputProps={{
            'data-testid': 'edit-field',
          }}
          error={isError}
          autoFocus
          className={classes.editInput}
          defaultValue={itemData.text}
          onChange={handleTodoText}
          helperText={message}
        />
        <div className={classes.controls}>
          <IconButton color="secondary" type="save" clickHandler={saveUpdatedTodo} />
        </div>
      </>
    ),
  };

  return (
    <Paper data-testid="todo-item" elevation={2} className={classes.todoWrapper}>
      {todoItemContent[todoItem.status]}
    </Paper>
  );
};

export default TodoItem;
