const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    
    name: {type:String, require: true, trim: true},
    brand: {type:String, require: true, trim: true},
    insurance: {type:Number},
    price: {type:Number},
    

},{ 
    
    timestamps: true,
    collection:'products',
    toJSON: { virtuals: true },
    
});

stockSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'product',
});



const stock = mongoose.model("Product",stockSchema)

module.exports = stock