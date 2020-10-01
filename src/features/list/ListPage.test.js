import React from 'react';
import { render } from '@testing-library/react';
import ListPage from './ListPage';

test('renders', () => {
  const { getByText } = render(<ListPage />);
  const h1 = getByText(/List/i);

  expect(h1).toBeInTheDocument();
});
