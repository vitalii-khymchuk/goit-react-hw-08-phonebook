const dynamicSort = property => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    const result =
      a[property].toLowerCase() < b[property].toLowerCase()
        ? -1
        : a[property].toLowerCase() > b[property].toLowerCase()
        ? 1
        : 0;
    return result * sortOrder;
  };
};

const sortAZ = contacts => {
  const items = [...contacts];
  if (items.length > 1) {
    return items.sort(dynamicSort('name'));
  }
  return items;
};

export { sortAZ };
