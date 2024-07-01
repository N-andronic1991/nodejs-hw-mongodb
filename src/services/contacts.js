import { SORT_ORDER } from '../constants/index.js';
import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { saveFileToCloudinary } from '../utils/saveToCloudinary.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const contactsFilters = Contact.find({ ...filter, userId });
  if (filter.contactType) {
    contactsFilters.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavourite === 'boolean') {
    contactsFilters.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsFilters).countDocuments(),
    Contact.find()
      .merge(contactsFilters)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  if (paginationData.page > paginationData.totalPages) return [];

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId: userId });
  return contact;
};

export const createContact = async ({ photo, ...payload }, userId) => {
  const photoUrl = await saveFileToCloudinary(photo);
  const contact = await Contact.create({
    ...payload,
    userId: userId,
    photo: photoUrl,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  userId,
  { photo, ...payload },
  options = {},
) => {
  const photoUrl = await saveFileToCloudinary(photo);
  const rawResult = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      userId: userId,
    },
    { ...payload, photo: photoUrl },

    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId: userId,
  });
  return contact;
};
