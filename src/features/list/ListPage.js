import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchUserList } from './slice';
import ListItem from './ListItem';

export function ListPage(props) {
  useEffect(() => {
    props.fetchUserList();

    // eslint-disable-next-line
  }, []);

  let history = useHistory();

  const navigateToDetails = useCallback(
    (userId) => {
      history.push('/details/' + userId);
    },
    [history],
  );

  return (
    <section>
      <h1>List</h1>
      <ul>
        {props.users &&
          props.users.map(
            ({
              name: { first, last },
              login: { uuid, username },
              email,
              picture: { thumbnail },
            }) => {
              return (
                <ListItem
                  key={uuid}
                  src={thumbnail}
                  firstName={first}
                  lastName={last}
                  username={username}
                  email={email}
                  uuid={uuid}
                  navigateToDetails={navigateToDetails}
                />
              );
            },
          )}
      </ul>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.entities,
  };
};

export default connect(mapStateToProps, { fetchUserList })(ListPage);
