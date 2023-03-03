const { findOne } = require("../models/user")
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('../config/index');
const { user } = require("./productController");





exports.index = async (req, res, next) =>{

    const user = await User.find().select('role name email password location phone')

    res.status(200).json({
        data: user
    })
}



exports.register = async (req, res, next) =>{
try{
    const { name, email, password, location, phone} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Data is not true")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;
    }

    const existEmail = await User.findOne({ email:email })
    if(existEmail){
    const error = new Error("This email have already")
    error.statusCode = 400
    throw error;
    }

    if(password.length <5 ){
        const error = new Error("This password less that 5")
    error.statusCode = 400
    throw error;
    }


    let user = new User();
    user.name = name
    user.email = email
    user.password = await user.encryptPassword(password)
    user.location = location
    user.phone = phone

    await user.save();

    res.status(200).json({
        message: "register Suscced"
  })
}catch(error){
        next(error)
}
}

exports.login = async (req, res, next ) => {
    try{
      const { email, password} = req.body
  
       // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Data is not true")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;
    }
  
    const user = await User.findOne({ email:email })
    if(!user){
     const error = new Error("This email have no data.")
     error.statusCode = 404
     throw error;
    }
  
    const isValid = await user.checkPassword(password)
    if(!isValid){
      const error = new Error("Password not match.")
      error.statusCode = 401
      throw error;
     }

      //create Token
    const token = await jwt.sign({
        id:user._id,
        role:user.role,
    },config.SECRET_KEY ,{ expiresIn: "5 days"})

    const expires_In = jwt.decode(token)
  
      res.status(200).json({
        access_token: token,
        expires_In: expires_In.exp,
        token_type: 'Bearer'
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

          const user = await User.deleteOne({
              _id : id
          })

          if(user.deletedCount === 0){
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

      const { id } = req.user;
      const { name, password, location, phone, product } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const error = new Error("Data is not true")
          error.statusCode = 422
          error.validation = errors.array()
          throw error;
      }

      const userPAS = await User.findById(id);

        if(password){
          if (password?.length <= 5) {
            const error = new Error("Password more than 5 characters.");
            error.statusCode = 400;
            throw error;
          }
        }

        if(phone){
          if (phone?.length != 10) {
            const error = new Error("Phone Number not True it have 10 num");
            error.statusCode = 400;
            throw error;
          }
        }

        if(product){
          if (product?.length != 24){
            const error = new Error("You Product ID not True it have 24 cha");
            error.statusCode = 400;
            throw error;
          }
        }

        const user = await User.updateOne({ _id : id},{
          ...(name && {name: name}),
          ...(password && {password: await userPAS?.encryptPassword(password)}),
          ...(location && {location: location}),
          ...(phone && {phone: phone}),
          ...(product && {product: product})
  
        })
  
        if(user.n == 0){
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

exports.profile = (req, res, next) =>{
  const { role, name, email, product} = req.user
  res.status(200).json({
    name: name,
    email: email,
    role: role,
    product: product,
  })
}

exports.show = async (req, res, next) =>{

  try{
      const { id } = req.params
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const error = new Error("Data is not true")
          error.statusCode = 422
          error.validation = errors.array()
          throw error;
      }
  

      const user = await User.findOne({
          _id : id
      })
  
      if(!user){
      
          const error = new Error('No have this ID');
          error.statusCode = 400;
          throw error;
  
      }
  
      res.status(200).json({
          data : user
      })
  
  

  } catch (error){

      next(error)

  }
}

