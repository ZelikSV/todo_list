import React, { FC, useMemo } from 'react';
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
  updateTodoItem: (editedTodo: ITodoItem) => void;
};

const TodoList: FC<Props> = ({ todos, removeTodoItem, updateTodoItem }) => {
  const classes = useStyles();

  const sortedList = useMemo(
    () =>
      todos.sort((a, b) => {
        return new Date(b.updatedAt ?? b.createdAt).getTime() - new Date(a.updatedAt ?? a.createdAt).getTime();
      }),
    [todos],
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {sortedList.length ? (
          sortedList.map((item) => (
            <TodoItem key={item.id} itemData={item} removeTodoItem={removeTodoItem} updateTodoItem={updateTodoItem} />
          ))
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
