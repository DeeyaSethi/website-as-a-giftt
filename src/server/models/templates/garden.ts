import mongoose from 'mongoose';

export const GardenTemplateSchema = new mongoose.Schema({
    flowerMeaning: String,
    favoriteFlower: String,
}, { _id: false });
