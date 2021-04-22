import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import IconButton from '../IconButton';

describe('Icon Button component tests', () => {
  it('Icon Button is visible', () => {
    const click = jest.fn();
    const iconBtn = render(<IconButton type="save" color="secondary" clickHandler={click} />);

    expect(iconBtn.getByTestId('IconBtn__save')).toBeVisible();
  });
});
