import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import ListItem from './ListItem';
import { RESULTS_COUNT, LOADING_STATES } from '../../constants';

const Row = React.memo((props) => {
  const { index, style, data } = props;

  if (data.users[index]) {
    const {
      name: { first, last },
      login: { uuid, username },
      email,
      picture: { thumbnail },
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
      Loading...
    </div>
  );
});

export default function ListPage({
  setUserData,
  fetchUserList,
  users,
  loading,
}) {
  let history = useHistory();

  const navigateToDetails = useCallback(
    (userId, index) => {
      setUserData(users[index]);
      history.push('/details/' + userId);
    },
    [history, setUserData, users],
  );

  const isItemLoaded = useCallback((index) => index < users.length, [
    users.length,
  ]);

  const loadMoreItems = () => {
    if (loading !== LOADING_STATES.LOADING) {
      fetchUserList();
    }
  };

  return (
    <section>
      <h1>List</h1>
      {users && (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={1000}
          threshold={RESULTS_COUNT}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={450}
              itemCount={1000}
              itemData={{ users: users, navigateToDetails }}
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
      {users.length === 1000 && <strong>End of catalog</strong>}
    </section>
  );
}
