import { connect } from 'react-redux';

import DetailsPage from './DetailsPage';

const mapStateToProps = (state) => {
  return {
    user: state.user.details,
  };
};

export default connect(mapStateToProps)(DetailsPage);
