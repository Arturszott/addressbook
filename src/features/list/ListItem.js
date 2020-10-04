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
    <li onClick={onClick}>
      <img src={src} alt={firstName + ' ' + lastName} /> {firstName} {lastName}{' '}
      ({username}) {email}
    </li>
  );
}

export default React.memo(ListItem);
