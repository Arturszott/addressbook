import { connect } from 'react-redux';

import ListPage from './ListPage';
import { fetchUserList } from './slice';
import { setUserData } from '../details/slice';

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
