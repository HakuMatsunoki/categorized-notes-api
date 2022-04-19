const Note = require('../models/noteModel');
const AppError = require('../utils/appError');
const enums = require('../constants/enums');

/**
 * Get all notes from DB
 * @returns {Promise<Object>}
 */
exports.getAll = async () => {
  const notes = await Note.find().lean();

  if (!notes) throw new AppError('Something went wrong..', 500);

  return notes;
};

/**
 * Create new note
 * @param {Object} noteData
 * @returns {Promise<Object>}
 */
exports.createOne = async (noteData) => {
  const newNote = await Note.create(noteData);

  if (!newNote) throw new AppError('Something went wrong..', 500);

  return newNote;
};

/**
 * Get one note from DB
 * @param {String} id
 * @returns {Promise<Object>}
 */
exports.getOne = async (id) => {
  const note = await Note.findOne({ id }).lean();

  if (!note) throw new AppError('Item not found', 404);

  return note;
};

/**
 * Get one note from DB
 * @param {String} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
exports.findOneAndUpdate = async (id, data) => {
  const updatedNote = await Note.findOneAndUpdate({ id }, data, { new: true }).lean();

  if (!updatedNote) throw new AppError('Item not found', 404);

  return updatedNote;
};

/**
 * Delete note
 * @param {String} id
 * @returns {Promise<void>}
 */
exports.findOneAndDelete = async (id) => {
  const deletedNote = await Note.findOneAndDelete({ id }).lean();

  if (!deletedNote) throw new AppError('Item not found', 404);
};

/**
 * Get notes stats
 * @returns {Promise<Object>}
 */
exports.getStats = async () => {
  const notes = await Note.find().select('archived category').lean();

  if (!notes) throw new AppError('Something went wrong..', 500);

  const catKeysMap = {};

  Object.keys(enums.categories).forEach((key) => {
    catKeysMap[key] = { active: 0, archived: 0 };
  });

  return notes.reduce((acc, note) => {
    !note.archived ? acc[note.category].active++ : acc[note.category].archived++;

    return acc;
  }, catKeysMap);
};

/**
 * Delete all notes marked as archived/not archived
 * @param {Boolean} isArchived
 * @returns {Promise<void>}
 */
exports.deleteAll = async (isArchived) => {
  await Note.deleteMany({ archived: isArchived });
};

/**
 * Update all notes marked as archived/not archived
 * @param {Boolean} isArchived
 * @returns {Promise<Object>}
 */
exports.toggleArch = async (isArchived) => {
  const updatedNotes = await Note.updateMany({ archived: isArchived }, { archived: !isArchived }, { new: true }).lean();

  return updatedNotes;
};
