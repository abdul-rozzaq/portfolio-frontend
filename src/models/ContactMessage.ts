import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IContactMessage extends Document {
    name: string;
    email: string;
    message: string;
    isRead: boolean;
}

const ContactMessageSchema: Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
