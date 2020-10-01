import React from 'react';
import { render } from '@testing-library/react';
import { ListPage } from './ListPage';

test('renders headline', () => {
  const fetchUserList = jest.fn();
  const { getByText } = render(<ListPage fetchUserList={fetchUserList} />);
  const h1 = getByText(/List/i);

  expect(h1).toBeInTheDocument();
});

test('renders list of users', () => {
  const fetchUserList = jest.fn();
  const { getByText } = render(
    <ListPage
      fetchUserList={fetchUserList}
      users={[
        { name: { first: 'Artur', last: 'Szott' }, login: { uuid: '1' } },
        { name: { first: 'Peter', last: 'Parker' }, login: { uuid: '1a' } },
      ]}
    />,
  );
  const userItem = getByText(/Artur/i);
  const userItem2 = getByText(/Peter/i);

  expect(userItem).toBeInTheDocument();
  expect(userItem2).toBeInTheDocument();
});
