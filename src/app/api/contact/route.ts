import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { ContactMessage } from '@/models/ContactMessage';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        await dbConnect();

        const newMessage = await ContactMessage.create({
            name,
            email,
            message,
        });

        return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'An error occurred while saving the message.' },
            { status: 500 }
        );
    }
}
