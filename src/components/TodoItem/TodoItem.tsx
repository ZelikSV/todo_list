import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { ITodoItem, TodoStatus } from '../../types';
import { dateFormat } from '../../constants';

type Props = {
  itemData: ITodoItem;
  removeTodoItem: (id: string) => () => void;
  editTodoItem: (editedTodo: ITodoItem) => void;
};

const useStyles = makeStyles(() => ({
  todoWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    margin: '20px 0',
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

const TodoItem: FC<Props> = ({ itemData, removeTodoItem, editTodoItem }) => {
  const classes = useStyles();
  const [todoItem, setTodoItem] = useState<ITodoItem>(itemData);
  const [text, setText] = useState('');

  useEffect(() => {
    setTodoItem(itemData);
    setText(todoItem.text);
  }, [itemData, todoItem.text]);

  const saveUpdatedTodo = () => {
    if (text) {
      editTodoItem({
        ...itemData,
        text,
        updatedAt: new Date().toISOString(),
        status: TodoStatus.READ,
      });
    }
  };

  const handleTodoText = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(evt.target.value);
  };

  const handleTodoEdit = () => {
    setTodoItem((prevState) => ({ ...prevState, status: TodoStatus.EDIT }));
  };

  return (
    <Grid xs={12} item key={itemData.id}>
      {todoItem.status === TodoStatus.READ ? (
        <Paper elevation={2} className={classes.todoWrapper}>
          <span>{itemData.text}</span>
          <div className={classes.controls}>
            <span>
              {itemData.updatedAt
                ? dayjs(itemData.updatedAt).format(dateFormat)
                : dayjs(itemData.createdAt).format(dateFormat)}
            </span>
            <IconButton color="primary" aria-label="Edit" onClick={handleTodoEdit}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton color="secondary" aria-label="Delete" onClick={removeTodoItem(itemData.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </div>
        </Paper>
      ) : (
        <Paper elevation={2} className={classes.todoWrapper}>
          <TextField
            error={undefined}
            className={classes.editInput}
            defaultValue={itemData.text}
            onChange={handleTodoText}
            helperText=""
          />
          <div className={classes.controls}>
            <IconButton color="secondary" aria-label="Save" onClick={saveUpdatedTodo}>
              <SaveIcon fontSize="small" />
            </IconButton>
          </div>
        </Paper>
      )}
    </Grid>
  );
};

export default TodoItem;
