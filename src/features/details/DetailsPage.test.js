import React from 'react';
import { render } from '@testing-library/react';
import DetailsPage from './DetailsPage';

test('renders', () => {
  const { getByText } = render(<DetailsPage />);
  const h1 = getByText(/Details/i);

  expect(h1).toBeInTheDocument();
});
