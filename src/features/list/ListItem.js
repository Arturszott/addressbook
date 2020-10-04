import React, { useCallback } from 'react';

function ListItem({
  src,
  firstName,
  lastName,
  username,
  email,
  navigateToDetails,
  uuid,
  index,
}) {
  const onClick = useCallback(() => navigateToDetails(uuid, index), [
    index,
    navigateToDetails,
    uuid,
  ]);

  return (
    <li onClick={onClick} className="ListItem">
      <img src={src} alt={firstName + ' ' + lastName} />{' '}
      <span className="name">
        {firstName} {lastName} ({username})
      </span>{' '}
      <span className="email">{email}</span>
    </li>
  );
}

export default React.memo(ListItem);
