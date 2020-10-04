import { connect } from 'react-redux';

import SearchFilter from './SearchFilter';
import { setPhrase } from './slice';

const mapStateToProps = (state) => {
  return {
    searchPhrase: state.search.phrase,
  };
};

export default connect(mapStateToProps, { setPhrase })(SearchFilter);
