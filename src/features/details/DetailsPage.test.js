import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import { DetailsPage } from './DetailsPage';

const user = {
  location: {
    street: {
      name: 'Cyberpunk',
      number: 2077,
    },
    state: 'Somewhere in America',
    city: 'Night City',
    postcode: 0,
  },
};

test('renders all user details', () => {
  const fetchMock = jest.fn();
  const history = createMemoryHistory();

  const { getByText } = render(
    <Router history={history}>
      <DetailsPage fetchUserById={fetchMock} user={user} />
    </Router>,
  );
  const street = getByText(/Cyberpunk 2077/i);
  const state = getByText(/Somewhere in America/i);
  const city = getByText(/Night City 0/i);

  expect(street).toBeInTheDocument();
  expect(state).toBeInTheDocument();
  expect(city).toBeInTheDocument();
});

test('calls fetchUserById with userId to get data for the view on mount', () => {
  const fetchMock = jest.fn();

  const history = createMemoryHistory({
    initialEntries: ['/details/some-user-id'],
  });

  render(
    <Router history={history}>
      <Route path="/details/:userId">
        <DetailsPage fetchUserById={fetchMock} user={user} />
      </Route>
    </Router>,
  );

  expect(fetchMock).toHaveBeenCalledWith('some-user-id');
});

test('goes back in history when close button is clicked', () => {
  const fetchMock = jest.fn();
  let goBackMock = jest.fn();

  const history = createMemoryHistory();
  history.goBack = goBackMock;

  render(
    <Router history={history}>
      <DetailsPage fetchUserById={fetchMock} user={user} />
    </Router>,
  );

  userEvent.click(screen.getByText('Close'));

  expect(goBackMock).toHaveBeenCalled();
});
