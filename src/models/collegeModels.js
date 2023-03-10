const mongoose = require('mongoose')



const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: "name is required",
        unique: true,
        
    },

    fullName: {
        type: String,
        required: "fullname is required",
        
    },

    logoLink: {

        type: String,
        required: "logo link is required",
        
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true })


module.exports = mongoose.model("College", collegeSchema)