import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Project } from '@/models/Project';
import { ContactMessage } from '@/models/ContactMessage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const totalProjects = await Project.countDocuments();
    const totalMessages = await ContactMessage.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ isRead: false });

    return NextResponse.json({
        projects: totalProjects,
        messages: totalMessages,
        unread: unreadMessages
    });
}
