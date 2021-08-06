var express = require('express');
var router = express.Router();
const imageController = require('../controllers').imageController;
const captionController = require('../controllers').captionController;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/api/image', imageController.getAllImages);
router.get('/api/image/:id', imageController.getImageById);
router.post('/api/image', imageController.addImage);
router.post('/api/image/:id', captionController.addCaptionToImage);

module.exports = router;
