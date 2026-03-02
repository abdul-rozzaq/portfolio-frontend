import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    slug: string;
    description: string;
    techStack: string[];
    coverImage?: string;
    liveUrl?: string;
    repoUrl?: string;
    featured: boolean;
    order: number;
}

const ProjectSchema: Schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        techStack: [{ type: String }],
        coverImage: { type: String },
        liveUrl: { type: String },
        repoUrl: { type: String },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
