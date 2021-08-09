var express = require('express');
var router = express.Router();
const imageController = require('../controllers').imageController;
const captionController = require('../controllers').captionController;
const userController = require('../controllers').userController;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const redirectLogin = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
}

const redirectHome = (req, res, next) => {
  if(req.session.userId) {
    res.redirect('/home') 
  } else {
    next();
  }
}

router.use(async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    res.locals.user = await userController.findUserById(userId);
  }
  next();
})

router.get('/login', redirectHome, function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', redirectHome, function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/home', redirectLogin, async function(req, res, next) {
  const images = await imageController.getAllImages();
  if(images) {
      res.render('home', { title: 'Express', user: res.locals.user, content: images});
  } else {
      res.status(404).send('Images not found'); 
  }  
});

router.post('/login', redirectHome, userController.loginUser);

router.post('/register', redirectHome, userController.createUser);

router.post('/logout', redirectLogin, userController.logoutUser);




/*router.get('/api/image', imageController.getAllImages);
router.get('/api/image/:id', imageController.getImageById);
router.post('/api/image', imageController.addImage);
router.post('/api/image/:id', captionController.addCaptionToImage);*/

module.exports = router;
