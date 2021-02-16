const mongoose = require('mongoose');
// import {UserType} from '../models/user-type';
const Schema = mongoose.Schema;

const UserType = Object.freeze({ Admin: "Admin", Customer: "Customer"})


const UserSchema = new Schema(
    {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        email: {type:String, required:true},
        password: {type:String, required:true},
        birthDate: {type:Date, required:false},
        userType: {type:UserType, default: UserType.Customer, required: false}

    },
    {timestamps:true}
);

module.exports = mongoose.model('users',UserSchema);