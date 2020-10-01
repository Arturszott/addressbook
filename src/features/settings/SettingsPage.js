import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { selectNationality } from './slice';

const nationalities = ['CH', 'ES', 'FR', 'GB'];

export function SettingsPage({ selectNationality, selectedNationality }) {
  const onChange = useCallback(
    (event) => {
      selectNationality(event.target.value);
    },
    [selectNationality],
  );

  return (
    <section>
      <h1>Settings</h1>
      <label>
        List user's nationality:
        <select value={selectedNationality} onChange={onChange}>
          <option value="">All</option>
          {nationalities.map((nationality) => {
            return (
              <option value={nationality} key={nationality}>
                {nationality}
              </option>
            );
          })}
        </select>
      </label>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedNationality: state.settings.nationality,
  };
};

export default connect(mapStateToProps, { selectNationality })(SettingsPage);
