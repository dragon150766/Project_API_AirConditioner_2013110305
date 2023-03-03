const Staff = require('../models/staff')
const { body, validationResult } = require('express-validator');

exports.index = async (req, res, next) =>{

    const staff = await Staff.find().sort({_id:-1 })

    res.status(200).json({
        data: staff
    })
}

exports.insert = async (req, res, next) =>{

    try{

    const { name, salary, location, phone } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Data is not true")
            error.statusCode = 422
            error.validation = errors.array()
            throw error;
        }

        const existName = await Staff.findOne({ name:name })
        if(existName){
        const error = new Error("This Name have already")
        error.statusCode = 400
        throw error;
        }

        let staff = new Staff({
            name: name,
            salary: salary,
            location: location,
            phone: phone
        });
        await staff.save();

        res.status(200).json({
            message: 'the data has be save!'   
        })

    }catch(error){
        next(error);
    }
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
    

        const staff = await Staff.findOne({
            _id : id
        })
    
        if(!staff){
        
            const error = new Error('No have this ID');
            error.statusCode = 400;
            throw error;
    
        }
    
        res.status(200).json({
            data : staff
        })
    
    

    } catch (error){

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

            const staff = await Staff.deleteOne({
                _id : id
            })

            if(staff.deletedCount === 0){
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
        const { name, salary, location, phone } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Data is not true")
            error.statusCode = 422
            error.validation = errors.array()
            throw error;
        }

        if(phone){
            if (phone?.length != 10) {
              const error = new Error("Phone Number not True it have 10 num");
              error.statusCode = 400;
              throw error;
            }
          }

        const staff = await Staff.updateOne({ _id : id},{
            ...(name && {name: name}),
            ...(salary && {salary: salary}),
            ...(location && {location: location}),
            ...(phone && {phone: phone})
        })

        if(staff.n == 0){
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