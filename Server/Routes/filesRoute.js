
// filesRoute.js
const express = require('express');
const router = express.Router();
const filesController = require('../Controllers/filesControllers');

router.post('/upload', filesController.upload.single('file'), filesController.uploadFile);

router.get('/files', filesController.listFiles);

router.get('/files/:id', filesController.getFileById);

router.delete('/files/:id', filesController.deleteFileById);

module.exports = router;
