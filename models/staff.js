const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({

    name:  { type: String, required: true, trim: true}, 
    salary: { type: Number },
    location: {
      lat:Number,
      lgn:Number
      },
    phone: {type: String}

  },
  { timestamps: true,
    collection:"staffs"});

const staff = mongoose.model("Staff",staffSchema)

module.exports = staff