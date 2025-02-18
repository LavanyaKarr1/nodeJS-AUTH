const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const multerMiddleware = require('../middleware/upload-middleware');
const { uploadImageController, fetchImagesController, deleteImageController } = require('../controllers/image-controller');

const router = express.Router();

//upload the image
router.post(
    '/upload',
    authMiddleware,
    adminMiddleware, 
    multerMiddleware.single('image'),
    uploadImageController
);

//to get all the images
router.get('/get', authMiddleware,fetchImagesController);

//delete the image
//67b305cbebb4b7fb15e83690
router.delete('/delete/:id',authMiddleware,adminMiddleware,deleteImageController);

module.exports = router;