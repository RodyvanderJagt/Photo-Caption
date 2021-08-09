var express = require('express');
var router = express.Router();

const imageController = require('../controllers').imageController;
const captionController = require('../controllers').captionController;

router.get('/images', async (req, res) => {
    const images = await imageController.getAllImages();
    if(images) {
        console.log(images[0])
        res.render('images', {content: images})
    } else {
        res.status(404).send('Images not found'); 
    }
});

router.get('/images/:id', imageController.getImageById);

router.post('/images', imageController.addImage);

router.post('/images/:id', captionController.addCaptionToImage);




module.exports = router;