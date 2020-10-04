import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { ListPage } from './ListPage';

test('renders headline', () => {
  const fetchUserList = jest.fn();
  const { getByText } = render(
    <ListPage fetchUserList={fetchUserList} users={[]} />,
  );
  const h1 = getByText(/List/i);

  expect(h1).toBeInTheDocument();
});

test('calls fetchUserList to get data for the list', () => {
  const fetchUserList = jest.fn();
  render(<ListPage fetchUserList={fetchUserList} users={[]} />);

  expect(fetchUserList).toHaveBeenCalled();
});

test('navigates to user details page when user is clicked', () => {
  const fetchUserList = jest.fn();
  const setUserData = jest.fn();
  const pushMock = jest.fn();
  const history = createMemoryHistory();

  const users = [
    {
      name: { first: 'Artur', last: 'Szott' },
      login: { uuid: '1', username: 'Oliganti' },
      picture: { thumbnail: 'http://url.com' },
    },
  ];

  history.push = pushMock;

  render(
    <Router history={history}>
      <ListPage
        fetchUserList={fetchUserList}
        setUserData={setUserData}
        users={users}
      />
    </Router>,
  );

  userEvent.click(screen.getByText(/Artur/i));

  expect(setUserData).toHaveBeenCalledWith(users[0]);
  expect(pushMock).toHaveBeenCalled();
});

test('renders list of users', () => {
  const fetchUserList = jest.fn();
  const users = [
    {
      name: { first: 'Artur', last: 'Szott' },
      login: { uuid: '1', username: 'Oliganti' },
      picture: { thumbnail: 'http://url.com' },
    },
    {
      name: { first: 'Peter', last: 'Parker' },
      login: { uuid: '2', username: 'Spiderman' },
      picture: { thumbnail: 'http://url.com' },
    },
  ];

  const { getByText } = render(
    <ListPage fetchUserList={fetchUserList} users={users} />,
  );
  const userItem = getByText(/Artur/i);
  const userItem2 = getByText(/Peter/i);

  expect(userItem).toBeInTheDocument();
  expect(userItem2).toBeInTheDocument();
});
