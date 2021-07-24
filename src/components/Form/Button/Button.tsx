/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

type Props = ButtonProps & {
  label: string;
};

const Button: FC<Props> = ({ label, ...props }) => {
  return <AntButton {...props}>{label}</AntButton>;
};

export default Button;
