import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { ContactMessage } from '@/models/ContactMessage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const { id } = await params;

        const message = await ContactMessage.findByIdAndUpdate(id, { isRead: body.isRead }, { new: true });
        if (!message) return NextResponse.json({ error: 'Message not found' }, { status: 404 });

        return NextResponse.json(message);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update message' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const message = await ContactMessage.findByIdAndDelete(id);
        if (!message) return NextResponse.json({ error: 'Message not found' }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to delete message' }, { status: 500 });
    }
}
