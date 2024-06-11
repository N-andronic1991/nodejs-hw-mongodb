const parseNumber = (unknown, defaultValue) => {
  const isString = typeof unknown === 'string';
  if (!isString) return defaultValue;
  if (unknown <= 0) return defaultValue;

  const parsedNumber = parseInt(unknown);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  return {
    page: parseNumber(page, 1),
    perPage: parseNumber(perPage, 10),
  };
};
