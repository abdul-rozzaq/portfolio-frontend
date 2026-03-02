import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Profile } from '@/models/Profile';
import { User } from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        await dbConnect();

        const profile = await Profile.findOne().lean();
        const adminUser = await User.findOne({ role: 'admin' }).lean();

        // Return default structure if empty
        const profileData = profile || {
            fullName: '',
            title: '',
            bio: '',
            avatarUrl: '',
            socialLinks: {
                github: '',
                linkedin: '',
                twitter: ''
            }
        };

        return NextResponse.json({
            ...profileData,
            adminEmail: adminUser?.email || ''
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const body = await req.json();
        const { adminEmail, adminPassword, ...profileData } = body;

        let profile = await Profile.findOne();

        if (profile) {
            profile = await Profile.findByIdAndUpdate(profile._id, profileData, { new: true, runValidators: true });
        } else {
            profile = await Profile.create(profileData);
        }

        if (adminEmail) {
            const adminUser = await User.findOne({ email: session.user?.email || adminEmail });
            if (adminUser) {
                adminUser.email = adminEmail;
                if (adminPassword && adminPassword.trim() !== '') {
                    adminUser.password = await bcrypt.hash(adminPassword, 10);
                }
                await adminUser.save();
            }
        }

        return NextResponse.json({ ...profile.toObject(), adminEmail });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 500 });
    }
}
