const noteService = require('../services/noteService');
const catchAsync = require('../utils/catchAsync');

/**
 * Get all notes
 * @param {Object} req
 * @param {Object} res
 */
exports.getAll = catchAsync(async (req, res) => {
  const notes = await noteService.getAll();

  res.status(200).json({
    data: notes,
    length: notes.length
  });
});

/**
 * Create new note
 * @param {Object} req
 * @param {Object} res
 */
exports.createOne = catchAsync(async (req, res) => {
  const newNote = await noteService.createOne(req.body);

  res.status(201).json({
    data: newNote
  });
});

/**
 * GEt notes stats
 * @param {Object} req
 * @param {Object} res
 */
exports.getStats = catchAsync(async (req, res) => {
  const stats = await noteService.getStats();

  res.status(200).json({
    data: stats
  });
});

/**
 * Find one note by id
 * @param {Object} req
 * @param {Object} res
 */
exports.getOne = catchAsync(async (req, res) => {
  const { id } = req.params;

  const foundNote = await noteService.getOne(id);

  res.status(200).json({
    data: foundNote
  });
});

/**
 * Find one note by id and update
 * @param {Object} req
 * @param {Object} res
 */
exports.updateOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  const updatedNote = await noteService.findOneAndUpdate(id, newData);

  res.status(200).json({
    data: updatedNote
  });
});

/**
 * Find one note by id and delete
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteOne = catchAsync(async (req, res) => {
  const { id } = req.params;

  await noteService.findOneAndDelete(id);

  res.status(204).json();
});

/**
 * Delete all notes marked as archived/not archived
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteAll = catchAsync(async (req, res) => {
  const isArchived = req.body.archived;

  await noteService.deleteAll(isArchived);

  res.status(204).json();
});

/**
 * Delete all notes marked as archived/not archived
 * @param {Object} req
 * @param {Object} res
 */
exports.toggleArch = catchAsync(async (req, res) => {
  const isArchived = req.body.archived;

  const updatedNotes = await noteService.toggleArch(isArchived);

  res.status(200).json({
    data: updatedNotes,
    length: updatedNotes.length
  });
});
