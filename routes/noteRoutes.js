const express = require('express');

const noteController = require('../controllers/noteController');
const noteMiddleware = require('../middlewares/noteMiddleware');

const router = express.Router();

router
  .route('/')
  .get(noteController.getAll)
  .post(noteMiddleware.checkCreateData, noteController.createOne)
  .patch(noteMiddleware.checkArchived, noteController.toggleArch)
  .delete(noteMiddleware.checkArchived, noteController.deleteAll);

router.get('/stats', noteController.getStats);

router
  .route('/:id')
  .get(noteMiddleware.checkId, noteController.getOne)
  .patch(noteMiddleware.checkId, noteMiddleware.checkUpdateData, noteController.updateOne)
  .delete(noteMiddleware.checkId, noteController.deleteOne);

module.exports = router;
