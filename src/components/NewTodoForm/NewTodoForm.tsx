import React, { FC } from 'react';
import { Row, Col } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { superstructResolver } from '@hookform/resolvers/superstruct';

import { TextField, Button } from '../Form';
import { ITodoItem, TodoStatus } from '../../types';
import { TodoValues, schema, initialValues } from './TodoForm.schema';

type Props = {
  createTodoItem: (item: ITodoItem) => void;
};

const NewTodoForm: FC<Props> = ({ createTodoItem }) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: superstructResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: TodoValues) => {
    if (!values.todo) {
      return;
    }

    createTodoItem({
      id: uuidv4(),
      text: values.todo,
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
      status: TodoStatus.READ,
    });

    reset({ todo: null });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="todo-form">
      <Row align="middle">
        <Col>
          <Controller
            name="todo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                allowClear
                placeholder="Todo"
                value={value}
                onChange={onChange}
                testId="new-todo-field"
                error={(errors as undefined | { todo: { message: string } })?.todo?.message}
              />
            )}
          />
        </Col>
        <Col>
          <Button label="Add" disabled={!watch('todo')} type="primary" htmlType="submit" data-testid="submit-btn" />
        </Col>
      </Row>
    </form>
  );
};

export default NewTodoForm;
