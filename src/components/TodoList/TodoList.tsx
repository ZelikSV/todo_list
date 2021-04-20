import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import TodoItem from '../TodoItem/TodoItem';
import { ITodoItem } from '../../types';

const useStyles = makeStyles(() => ({
  placeholder: {
    padding: 50,
  },
}));

type Props = {
  todos: ITodoItem[];
  removeTodoItem: (id: string) => () => void;
  editTodoItem: (editedTodo: ITodoItem) => void;
};

const TodoList: FC<Props> = ({ todos, removeTodoItem, editTodoItem }) => {
  const classes = useStyles();

  const sortedList = todos.sort((a, b) => {
    return new Date(b.updatedAt ?? b.createdAt).getTime() - new Date(a.updatedAt ?? a.createdAt).getTime();
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {sortedList.length ? (
          sortedList.map((item) => {
            return (
              <TodoItem key={item.id} itemData={item} removeTodoItem={removeTodoItem} editTodoItem={editTodoItem} />
            );
          })
        ) : (
          <Typography variant="h5" component="h2" align="center" className={classes.placeholder}>
            Empty Data
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default TodoList;
