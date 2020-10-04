import { connect } from 'react-redux';

import SettingsPage from './SettingsPage';
import { selectNationality } from './slice';

const mapStateToProps = (state) => {
  return {
    selectedNationality: state.settings.nationality,
  };
};

export default connect(mapStateToProps, { selectNationality })(SettingsPage);
