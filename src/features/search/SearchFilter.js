import React, { useCallback } from 'react';

import './search.scss';

export default function SearchFilter({ setPhrase, searchPhrase }) {
  const onChange = useCallback(
    (event) => {
      setPhrase(event.target.value);
    },
    [setPhrase],
  );

  return (
    <section className="SearchFilter">
      <label>
        Filter results
        <input
          type="text"
          name="search"
          placeholder="Search phrase..."
          onChange={onChange}
          value={searchPhrase}
        />
      </label>
    </section>
  );
}
