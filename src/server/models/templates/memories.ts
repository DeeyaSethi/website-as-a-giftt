import mongoose from 'mongoose';

export const MemoriesTemplateSchema = new mongoose.Schema({
    favoriteMemories: String,
}, { _id: false });
