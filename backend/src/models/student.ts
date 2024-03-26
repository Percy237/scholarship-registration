import mongoose from "mongoose";


export type StudentType = {
    _id:string;
    email:string;
    phoneNumber: string;
    fullName: string;
}

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type:String, 
        required: true,
        unique: true
    },
    fullName: {
        type:String, required: true
    }
})

const Student = mongoose.model<StudentType>("Student", studentSchema);

export default Student;
