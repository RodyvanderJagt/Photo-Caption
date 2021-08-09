const Image = require('../models').Image;
const Caption = require('../models').Caption;

const getAllImages = () => {
    return Image.findAll()
    .then((images) => images)
    .catch((error) => {throw Error(error)} );
}

const getImageById = (req, res) => {
    return Image.findByPk(req.params.id, {
        include: [{
            model: Caption,
            as: 'captions'
          }],
        })
    .then((image) => {
        if(!image) {
            return res.status(404).send({
                message: 'Image not found'
            });
        }
        return res.status(200).send(image);
    })
    .catch((error) => res.status(400).send(error));
}

const addImage = (req, res) => {
    return Image.create({
        filepath: req.body.filepath
    })
    .then((image) => res.status(201).send(image))
    .catch((error) => res.status(400).send(error));
}

module.exports = {
    getAllImages,
    getImageById,
    addImage
}

