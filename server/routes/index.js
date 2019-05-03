const express = require('express');
const router = express.Router();

const documents = require('../service/documents');

router.post('/', async (req, res, next) => {
  try {
    await documents.create(req.body);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res) => {
  res.json(await documents.getPreviews());
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await documents.findById(req.params.id))
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await documents.deleteDocument(req.params.id);
    res.sendStatus(200)
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    await documents.replaceDocument(req.params.id, req.body);
    res.sendStatus(200)
  } catch (e) {
    next(e);
  }
});

module.exports = router;
