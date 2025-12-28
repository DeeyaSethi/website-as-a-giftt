import mongoose from 'mongoose';

export const HeroTemplateSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    message: String,
}, { _id: false });
