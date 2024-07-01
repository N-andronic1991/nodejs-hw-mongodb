const parseType = (unknown) => {
  const isType = ['work', 'home', 'personal'].includes(unknown);
  if (!isType) return;
  return unknown;
};

const parseBoolean = (unknown) => {
  if (!['true', 'false'].includes(unknown)) return;

  return unknown === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
  return {
    contactType: parseType(query.contactType),
    isFavourite: parseBoolean(query.isFavourite),
  };
};
