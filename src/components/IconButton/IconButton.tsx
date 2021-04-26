import React, { FC } from 'react';
import MUIconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PropTypes } from '@material-ui/core';

type Props = {
  type: 'save' | 'edit' | 'delete';
  clickHandler: () => void;
  color: PropTypes.Color;
};

const IconButton: FC<Props> = ({ clickHandler, type, color }) => {
  const config = {
    save: <SaveIcon fontSize="small" />,
    delete: <Delete fontSize="small" />,
    edit: <EditIcon fontSize="small" />,
  };

  return (
    <MUIconButton data-testid={`IconBtn__${type}`} color={color} aria-label={type} onClick={clickHandler}>
      {config[type]}
    </MUIconButton>
  );
};

export default IconButton;
