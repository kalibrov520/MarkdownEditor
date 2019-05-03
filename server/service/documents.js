const createError = require('http-errors');

const Document = require('../model/document');

const checkId = id => {
  if (!Document.isObjectId(id)) {
    throw createError(400, `invalid id: ${id}`);
  }
};

const create = async document => {
  try {
    await Document.create(document);
  } catch (e) {
    throw createError(400, e)
  }
};

const findById = async id => {
  checkId(id);
  const document = await Document.findById(id);
  if (!document) {
    throw createError(404, `document not found: ${id}`);
  }
  return {
    id: document._id,
    created: document.created,
    title: document.title,
    content: document.content
  };
};

const getPreviews = async () => {
  const documentsPreview = await Document.find({})
    .sort({created: 'desc'})
    .select('title created');
  return documentsPreview.map(({created, title, _id}) => ({id: _id, created, title}))
};

const replaceDocument = async (id, document) => {
  checkId(id);
  const updatedDocument = await Document.findByIdAndUpdate(id, document);
  if (!updatedDocument) {
    throw createError(404, `document not found: ${id}`);
  }
};

const deleteDocument = async (id, document) => {
  checkId(id);
  const deletedDocument = await Document.findByIdAndRemove(id);
  if (!deletedDocument) {
    throw createError(404, `document not found: ${id}`);
  }
};

module.exports = {findById, getPreviews, create, replaceDocument, deleteDocument};
