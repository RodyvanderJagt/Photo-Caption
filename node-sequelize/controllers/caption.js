const Caption = require('../models').Caption;
const Image = require('../models').Image;

const addCaptionToImage = (req, res) => {
    return Caption.create({
        image_id: req.params.id,
        user_id: req.body.user_id,
        caption: req.body.caption
    })
    .then((caption) => res.status(201).send(caption))
    .catch((error) => res.status(400).send(error));
}

module.exports = {
    addCaptionToImage
}