export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getUpCasePhrase = (phrase) => {
  return phrase[0].toUpperCase() + phrase.slice(1);
};

export const sorterByField = (field) => {
  return (a, b) => a[field] > b[field] ? -1 : 1;
};

export const sorterByDate = (field) => {
  return (a, b) => a[field].timeDuration > b[field].timeDuration ? -1 : 1;
};
