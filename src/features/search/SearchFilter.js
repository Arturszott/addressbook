import React, { useCallback } from 'react';

export default function SearchFilter(props) {
  const onChange = useCallback(
    (event) => {
      props.setPhrase(event.target.value);
    },
    [props],
  );

  return (
    <section>
      <label>
        Filter results
        <input
          type="text"
          name="search"
          onChange={onChange}
          value={props.searchPhrase}
        />
      </label>
    </section>
  );
}
