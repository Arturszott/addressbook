import React, { useCallback } from 'react';

export default function SearchFilter({ setPhrase, searchPhrase }) {
  const onChange = useCallback(
    (event) => {
      setPhrase(event.target.value);
    },
    [setPhrase],
  );

  return (
    <section>
      <label>
        Filter results
        <input
          type="text"
          name="search"
          onChange={onChange}
          value={searchPhrase}
        />
      </label>
    </section>
  );
}
