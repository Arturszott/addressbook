import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchFilter } from './SearchFilter';
import userEvent from '@testing-library/user-event';

test('updates store with callback when user types', () => {
  const setPhraseMock = jest.fn();

  render(<SearchFilter setPhrase={setPhraseMock} />);

  const input = screen.getByLabelText('Filter results');

  userEvent.type(input, 'Art');

  expect(setPhraseMock).toHaveBeenCalledWith('Art');
});
