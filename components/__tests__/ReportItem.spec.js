import React from 'react';
import {render} from '@testing-library/react';

describe('ReportItem', () => {
  test('hello world', () => {
    const {getByText} = render(<p>Hello Jest!</p>);
    expect(getByText('Hello Jest!')).toBeInTheDocument();
  });
});
