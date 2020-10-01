export const toQuery = (map) => {
  return Object.entries(map)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');
};
