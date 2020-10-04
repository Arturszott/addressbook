import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Home and Settings link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Home/i);
  const secondLinkElement = getByText(/Settings/i);

  expect(linkElement).toBeInTheDocument();
  expect(secondLinkElement).toBeInTheDocument();
});
