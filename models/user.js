const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const userSchema = new Schema({

    role: { type:String , default: 'member'},
    name: { type:String, require: true, trim: true},
    email: { type:String , require: true, trim: true, unique: true, index: true},
    password: { type:String, require: true, trim: true, minlength: 5 },
    location: {
      lat:Number,
      lgn:Number
     },
    phone: {type: String},
    product: {type: Schema.Types.ObjectId, ref: 'Product'}
    

},{ 
    toJSON: { virtuals: true },
    timestamps: true,
    collection:"users"
});




userSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(5) 
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
  }
  
userSchema.methods.checkPassword = async function(password){
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
  }

const user = mongoose.model("User",userSchema)

module.exports = user