import mongoose from 'mongoose';
const bcrypt=require('bcryptjs');

export type AdminType = {
    _id:string;
    email:string;
    password:string;
    name: string;
}

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {type: String, required:true},
    name: {type:String, required:true},
})


const Admin = mongoose.model<AdminType>("Admin", adminSchema);

export default Admin;