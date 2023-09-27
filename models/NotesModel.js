
import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types

const NotesSchema = new Schema({
    user:{
        type: ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
export default model('notes', NotesSchema);

//THIS IS THE SECOND METHOD

// import mongoose from "mongoose";

// const noteSchema = new mongoose.Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'user'
//     },
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true,
//     },
//     tag:{
//         type:String,
//         default:"General"
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     },
// });

// export default mongoose.model("notes" , noteSchema)