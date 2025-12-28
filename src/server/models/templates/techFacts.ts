import mongoose from 'mongoose';

export const TechFactsTemplateSchema = new mongoose.Schema({
    techFactsMessage: String,
    fetchLiveFacts: String,
    // Store fetched facts if we want to cache them
    techFacts: [String],
}, { _id: false });
