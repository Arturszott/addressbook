import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { setPhrase } from './slice';

export function SearchFilter(props) {
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

const mapStateToProps = (state) => {
  return {
    searchPhrase: state.search.phrase,
  };
};

export default connect(mapStateToProps, { setPhrase })(SearchFilter);
