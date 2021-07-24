/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import { ErrorMessage, TextFieldLabel, TextFieldContainer } from './TextField.styles';

type Props = Omit<InputProps, 'value'> & {
  error?: string;
  label?: string;
  value?: string | null;
  testId: string;
};

const TextField: FC<Props> = ({ label = '', error = '', testId, value, ...props }) => {
  return (
    <TextFieldContainer data-testid={testId}>
      {label && <TextFieldLabel>{label}</TextFieldLabel>}
      <Input {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TextFieldContainer>
  );
};

export default TextField;
