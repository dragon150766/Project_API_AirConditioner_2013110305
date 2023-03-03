const Product = require('../models/product');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.index = async (req, res, next) =>{

    const product = await Product.find().sort({_id:-1 })

    res.status(200).json({
        data: product
    })
}

exports.user = async (req, res, next) =>{
    const user = await User.find().populate('product')
    res.status(200).json({
        data: user
    })
}

exports.show = async (req, res, next) =>{

    try{
        const { id } = req.params;
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Data is not true")
            error.statusCode = 422
            error.validation = errors.array()
            throw error;
        }
        
                
            const product = await Product.findOne({
                _id : id
            }).populate('users')

            if(!product){
                const error = new Error('have no this id')
                error.statusCode = 400
                throw error;
            }


            res.status(200).json({
                data: product,
            });

    } catch (error) {
        
        next(error);
    }
}

exports.insert = async (req, res, next) =>{
    try{
    const { name, brand, insurance, price  } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Data is not true")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;

    }

    const existName = await Product.findOne({ name:name })
    if(existName){
    const error = new Error("This ProductName have already")
    error.statusCode = 400
    throw error;
    }

    let product = new Product({
        name: name,
        brand: brand,
        insurance: insurance,
        price: price,
    });

    await product.save();

    res.status(200).json({
        message: 'the data has be save!'   
    })

}catch(error){
    next(error)
}
}

exports.destroy = async (req, res, next) =>{

    try{
        const { id } = req.params

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Data is not true")
            error.statusCode = 422
            error.validation = errors.array()
            throw error;
        }

            const product = await Product.deleteOne({
                _id : id
            })

            if(product.deletedCount === 0){
                const error = new Error('No have this ID')
                error.statusCode = 400
                throw error;
            }else{
                res.status(200).json({
                    message: "delete sussced"
                })
            }


    }catch(error){

        next(error)

    }
}

exports.update = async (req, res, next) =>{

    try{

        const { id } = req.params;
        const { name, brand, insurance, price } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Data is not true")
            error.statusCode = 422
            error.validation = errors.array()
            throw error;
        }


        const product = await Product.updateOne({ _id : id},{
            ...(name && {name: name}),
            ...(brand && {brand: brand}),
            ...(insurance && {insurance: insurance}),
            ...(price && {price: price})
        })

        if(product.n == 0){
            const error = new Error('have no data update')
            error.statusCode = 400
            throw error;
        }


        res.status(200).json({
            message: "Update Sussced"
        })



    }catch(error){

        next(error)

    }

}