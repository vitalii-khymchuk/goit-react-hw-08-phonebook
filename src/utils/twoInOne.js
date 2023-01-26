const save = (value1, value2) => `${value1}@${value2} `;

const getFirstValue = str => {
  const index = str.indexOf('@');
  return str.slice(0, index);
};

const getSecondValue = str => {
  const index = str.indexOf('@');
  return str.slice(index + 1);
};

const twoInOne = { save, getFirstValue, getSecondValue };
export default twoInOne;
