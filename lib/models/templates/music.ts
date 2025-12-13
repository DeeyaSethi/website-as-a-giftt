import mongoose from 'mongoose';

export const MusicTemplateSchema = new mongoose.Schema({
    playlistSource: String,
    predefinedPlaylist: String,
    youtubeInput: String,
    playlistTitle: String,
    playlistDescription: String,
    customThumbnail: String,
}, { _id: false });
