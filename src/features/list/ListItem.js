import React from 'react';

function ListItem({
  src,
  firstName,
  lastName,
  username,
  email,
  navigateToDetails,
  uuid,
}) {
  return (
    <li onClick={() => navigateToDetails(uuid)}>
      <img src={src} alt={firstName + ' ' + lastName} /> {firstName} {lastName}{' '}
      ({username}) {email}
    </li>
  );
}

export default React.memo(ListItem);
