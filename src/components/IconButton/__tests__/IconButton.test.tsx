import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import IconButton from '../IconButton';

test('Icon Button is visible', () => {
  const iconBtn = render(<IconButton type="save" color="secondary" clickHandler={() => ({})} />);

  expect(iconBtn.getByTestId('IconBtn__save')).toBeVisible();
});
