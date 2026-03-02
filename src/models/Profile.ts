import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProfile extends Document {
    fullName: string;
    title: string;
    bio: string;
    avatarUrl?: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
}

const ProfileSchema: Schema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        title: { type: String, required: true },
        bio: { type: String, required: true },
        avatarUrl: { type: String },
        socialLinks: {
            github: { type: String },
            linkedin: { type: String },
            twitter: { type: String },
        },
    },
    { timestamps: true }
);

export const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
