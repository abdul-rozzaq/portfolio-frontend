import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Project } from '@/models/Project';
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

        const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

        return NextResponse.json(project);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update project' }, { status: 500 });
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
        const project = await Project.findByIdAndDelete(id);
        if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to delete project' }, { status: 500 });
    }
}
