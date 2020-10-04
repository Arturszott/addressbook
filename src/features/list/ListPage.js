import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { fetchUserList } from './slice';
import { setUserData } from '../details/slice';
import ListItem from './ListItem';
import { RESULTS_COUNT, LOADING_STATES } from '../../constants';

class Row extends React.PureComponent {
  render() {
    const { index, style, data } = this.props;

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
  }
}

export function ListPage(props) {
  let history = useHistory();

  const navigateToDetails = useCallback(
    (userId, index) => {
      props.setUserData(props.users[index]);
      history.push('/details/' + userId);
    },
    [history, props],
  );

  const isItemLoaded = useCallback((index) => index < props.users.length, [
    props.users.length,
  ]);

  const loadMoreItems = () => {
    if (props.loading !== LOADING_STATES.LOADING) {
      props.fetchUserList();
    }
  };

  return (
    <section>
      <h1>List</h1>
      {props.users && (
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
              itemData={{ users: props.users, navigateToDetails }}
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
      {props.users.length === 1000 && <strong>End of catalog</strong>}
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.entities,
    loading: state.users.loading,
    searchPhrase: state.search.phrase,
  };
};

export default connect(mapStateToProps, { fetchUserList, setUserData })(
  ListPage,
);
