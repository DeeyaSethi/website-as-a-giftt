import mongoose from 'mongoose';

export const LetterTemplateSchema = new mongoose.Schema({
    body: String,
    signature: String,
}, { _id: false });
