import mongoose from 'mongoose';

export const TravelTemplateSchema = new mongoose.Schema({
    placesVisited: String,
}, { _id: false });
