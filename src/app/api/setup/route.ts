import dbConnect from "@/lib/mongoose";
import { User } from "@/models/User";
import { Profile } from "@/models/Profile";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return NextResponse.json({ error: "ADMIN_EMAIL and ADMIN_PASSWORD must be defined in environment variables" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email: adminEmail });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            await User.create({
                email: adminEmail,
                password: hashedPassword,
                role: "admin",
            });

            await Profile.create({
                fullName: "John Doe",
                title: "Fullstack Engineer",
                bio: "I build high-performance, premium web experiences. Specializing in React, Node, and everything in between.",
                socialLinks: {
                    github: "https://github.com",
                    linkedin: "https://linkedin.com",
                    twitter: "https://twitter.com",
                }
            });

            return NextResponse.json({ message: `Admin user and default profile created: ${adminEmail}` });
        }

        return NextResponse.json({ message: "Admin already exists." });
    } catch (err) {
        return NextResponse.json({ error: "Failed to setup admin" }, { status: 500 });
    }
}
