import React, { useCallback } from 'react';

import './settings.scss';

const nationalities = ['CH', 'ES', 'FR', 'GB'];

export default function SettingsPage({
  selectNationality,
  selectedNationality,
}) {
  const onChange = useCallback(
    (event) => {
      selectNationality(event.target.value);
    },
    [selectNationality],
  );

  return (
    <section className="SettingsPage page">
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
