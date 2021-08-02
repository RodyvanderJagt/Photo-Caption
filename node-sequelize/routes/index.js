var express = require('express');
var router = express.Router();
const imageController = require('../controllers').imageController;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/image', imageController.getAllImages);
router.get('/api/image/:id', imageController.getImageById);
router.post('/api/image', imageController.addImage);

module.exports = router;
