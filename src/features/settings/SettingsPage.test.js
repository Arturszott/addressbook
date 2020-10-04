import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsPage from './SettingsPage';
import userEvent from '@testing-library/user-event';

test('renders headline', () => {
  const { getByText } = render(<SettingsPage />);
  const h1 = getByText(/Settings/i);

  expect(h1).toBeInTheDocument();
});

test('calls passed handler with select value when changed', () => {
  const selectNationalityMock = jest.fn();

  render(<SettingsPage selectNationality={selectNationalityMock} />);

  userEvent.selectOptions(screen.getByLabelText("List user's nationality:"), [
    'CH',
  ]);

  expect(selectNationalityMock).toHaveBeenCalledWith('CH');
});

test('sets select value for the one from props', () => {
  const selectNationalityMock = jest.fn();

  render(
    <SettingsPage
      selectNationality={selectNationalityMock}
      selectedNationality="ES"
    />,
  );

  const selectValue = screen.getByLabelText("List user's nationality:").value;
  expect(selectValue).toEqual('ES');
});
