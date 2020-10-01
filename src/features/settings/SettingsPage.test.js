import React from 'react';
import { render } from '@testing-library/react';
import SettingsPage from './SettingsPage';

test('renders', () => {
  const { getByText } = render(<SettingsPage />);
  const h1 = getByText(/Settings/i);

  expect(h1).toBeInTheDocument();
});
