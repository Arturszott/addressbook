import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import './details.scss';

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

export default function DetailsPage(props) {
  const history = useHistory();
  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <section className="DetailsPage">
      <h1>Details</h1>

      {props.user && (
        <div>
          <h2>Name</h2>
          <p>
            {props.user.name.first} {props.user.name.last}
          </p>
          <h2>Address</h2>
          {renderAddress(props.user)}
          <h2>Contact</h2>
          {renderContact(props.user)}
        </div>
      )}
      <button onClick={goBack}>Close</button>
    </section>
  );
}
