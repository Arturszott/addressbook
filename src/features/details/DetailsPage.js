import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Route } from 'react-router-dom';

import './details.scss';

import { fetchUserById } from './slice';

function renderAddress(user) {
  const {
    location: { street, state, city, postcode },
  } = user;
  return (
    <address>
      <p>
        {street.name} {street.number}
      </p>
      <p>
        {state}, {city} {postcode}
      </p>
    </address>
  );
}

function renderContact(user) {
  const { cell, phone } = user;

  return (
    <>
      <p>Cell: {cell}</p>
      <p>Phone: {phone}</p>
    </>
  );
}

export function DetailsPage(props) {
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    props.fetchUserById(params.userId);

    // eslint-disable-next-line
  }, []);

  return (
    <section className="DetailsPage">
      <h1>Details</h1>
      <button onClick={() => history.goBack()}>Close</button>

      {!props.user && 'Loading...'}
      {props.user && (
        <div>
          <h2>Address</h2>
          {renderAddress(props.user)}
          <h2>Contact</h2>
          {renderContact(props.user)}
        </div>
      )}
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.details,
  };
};

export default connect(mapStateToProps, { fetchUserById })(DetailsPage);
