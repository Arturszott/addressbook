import React from 'react';
import { render } from '@testing-library/react';
import { ListPage } from './ListPage';

test('renders headline', () => {
  const fetchUserList = jest.fn();
  const { getByText } = render(<ListPage fetchUserList={fetchUserList} />);
  const h1 = getByText(/List/i);

  expect(h1).toBeInTheDocument();
});

test('calls fetchUserList to get data for the list', () => {
  const fetchUserList = jest.fn();
  render(<ListPage fetchUserList={fetchUserList} />);

  expect(fetchUserList).toHaveBeenCalled();
});

test('renders list of users', () => {
  const fetchUserList = jest.fn();
  const { getByText } = render(
    <ListPage
      fetchUserList={fetchUserList}
      users={[
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
      ]}
    />,
  );
  const userItem = getByText(/Artur/i);
  const userItem2 = getByText(/Peter/i);

  expect(userItem).toBeInTheDocument();
  expect(userItem2).toBeInTheDocument();
});
