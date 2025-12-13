import mongoose from 'mongoose';
import {
    HeroTemplateSchema,
    LetterTemplateSchema,
    MusicTemplateSchema,
    TravelTemplateSchema,
    GardenTemplateSchema,
    MemoriesTemplateSchema,
    TechFactsTemplateSchema
} from './templates';

// --- Shared Sub-schemas ---

const ColorPaletteSchema = new mongoose.Schema({
    primary: String,
    secondary: String,
    accent: String,
    background: String,
    text: String,
}, { _id: false });

const ImageVariantSchema = new mongoose.Schema({
    thumbnail: String,
    medium: String,
    full: String,
}, { _id: false });

const ProcessedImageSchema = new mongoose.Schema({
    id: String,
    original: String, // Cloudinary URL or Base64
    variants: ImageVariantSchema,
    caption: String,
    width: Number,
    height: Number,
    size: Number,
}, { _id: false });

const SiteMetadataSchema = new mongoose.Schema({
    title: String,
    description: String,
    recipientName: String,
    occasion: String,
    createdAt: Date,
}, { _id: false });

// --- Template Specific Schemas ---
// Imported from ./templates

// Container for all template raw inputs
const TemplateContentSchema = new mongoose.Schema({
    hero: HeroTemplateSchema,
    letter: LetterTemplateSchema,
    music: MusicTemplateSchema,
    travel: TravelTemplateSchema,
    garden: GardenTemplateSchema,
    memories: MemoriesTemplateSchema,
    techfacts: TechFactsTemplateSchema,
    // Add gallery/other future templates here as optional fields
}, { _id: false });


// --- Main Config Schemas ---

const PageConfigSchema = new mongoose.Schema({
    type: { type: String, required: true },
    order: Number,
    content: { type: mongoose.Schema.Types.Mixed }, // Generated content remains flexible as it's output
    variant: String,
}, { _id: false });

const GeneratedSiteConfigSchema = new mongoose.Schema({
    theme: { type: String, default: 'general' },
    pages: [PageConfigSchema], // The generated output pages
    metadata: SiteMetadataSchema,
    colorPalette: ColorPaletteSchema,
    images: [ProcessedImageSchema],

    // User Inputs (Restorable State)
    recipientName: String,
    occasion: String,
    originalPrompt: String,
    selectedTemplates: [String],

    // STRICTLY TYPED TEMPLATE INPUTS
    templateContent: TemplateContentSchema,
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
        type: String,
        unique: true,
        sparse: true,
        index: true,
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    config: {
        type: GeneratedSiteConfigSchema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update timestamp on save
// Update timestamp on save
ProjectSchema.pre('save', function () {
    this.updatedAt = new Date();
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
