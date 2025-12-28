import mongoose from 'mongoose';

export const LetterTemplateSchema = new mongoose.Schema({
    body: String,
    signature: String,
    includeMusic: Boolean, // Toggle for default background music
}, { _id: false });
