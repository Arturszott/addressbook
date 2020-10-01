import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUserList } from './slice';

export function ListPage(props) {
  useEffect(() => {
    props.fetchUserList();

    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <h1>List</h1>
      <ul>
        {props.users &&
          props.users.map(({ name: { first, last }, login: { uuid } }) => {
            return (
              <li key={uuid}>
                {first} {last}
              </li>
            );
          })}
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
