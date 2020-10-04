import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import ListItem from './ListItem';
import {
  RESULTS_COUNT,
  LOADING_STATES,
  MAX_USERS_COUNT,
} from '../../constants';

const Row = React.memo((props) => {
  const { index, style, data } = props;

  if (data.users[index]) {
    const {
      name: { first, last },
      login: { uuid, username },
      picture: { thumbnail },
      email,
    } = data.users[index];

    return (
      <div className="VirtualizedListItem" style={style}>
        <ListItem
          key={uuid}
          src={thumbnail}
          firstName={first}
          lastName={last}
          username={username}
          email={email}
          uuid={uuid}
          index={index}
          navigateToDetails={data.navigateToDetails}
        />
      </div>
    );
  }

  return (
    <div className="VirtualizedListItem" style={style}>
      {data.isFiltering ? '' : 'Loading...'}
    </div>
  );
});

export default function ListPage({
  setUserData,
  fetchUserList,
  users,
  loading,
  searchPhrase,
}) {
  const history = useHistory();
  const filteredUsers = useMemo(
    () =>
      searchPhrase
        ? users.filter((user) => {
            return (
              `${user.name.first} ${user.name.last}`
                .toLowerCase()
                .indexOf(searchPhrase.toLowerCase()) !== -1
            );
          })
        : users,
    [searchPhrase, users],
  );
  const itemCount = searchPhrase ? filteredUsers.length : MAX_USERS_COUNT;

  const navigateToDetails = useCallback(
    (userId, index) => {
      setUserData(filteredUsers[index]);

      history.push(`/details/${userId}`);
    },
    [filteredUsers, history, setUserData],
  );

  const isItemLoaded = useCallback((index) => index < filteredUsers.length, [
    filteredUsers.length,
  ]);

  const loadMoreItems = useCallback(() => {
    if (loading !== LOADING_STATES.LOADING) {
      fetchUserList();
    }
  }, [fetchUserList, loading]);

  return (
    <section>
      <h1>List</h1>
      {searchPhrase && 'Only previously loaded users are shown while filtering'}
      {users && (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          threshold={RESULTS_COUNT}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={450}
              itemCount={itemCount}
              itemData={{
                users: filteredUsers,
                navigateToDetails,
                isFiltering: Boolean(searchPhrase),
              }}
              itemSize={51}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={900}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      )}

      {users.length === MAX_USERS_COUNT && <strong>End of catalog</strong>}
    </section>
  );
}
