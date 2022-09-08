// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storageImgProduct = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/products')
    },
    filename : function (req,file,callback){
        callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});

const uploadImgProduct = multer({
    storage : storageImgProduct
})

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post('/create',uploadImgProduct.single('image'), productsController.store);


/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put('/update/:id',uploadImgProduct.single('image'), productsController.update);


/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy);


module.exports = router;
