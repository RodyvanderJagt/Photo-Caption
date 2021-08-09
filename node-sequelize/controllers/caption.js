const Caption = require('../models').Caption;
const Image = require('../models').Image;

const addCaptionToImage = (req, res) => {
    return Caption.create({
        image_id: req.params.id,
        user_id: 2,
        caption: req.body.caption
    })
    .then((caption) => res.redirect('/home'))
    .catch((error) => res.status(400).send(error));
}

const getCaptionByImageId = (imageId, query_limit = 5) => {
    return Caption.findAll({
        where: {
            image_id: imageId
        },
        order: [['createdAt', 'DESC']],
        limit: query_limit,
    })
    .then(captions => captions)
    .catch(error => { throw new Error(error)});
}

module.exports = {
    addCaptionToImage,
    getCaptionByImageId
}