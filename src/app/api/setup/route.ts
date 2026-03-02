import dbConnect from "@/lib/mongoose";
import { User } from "@/models/User";
import { Profile } from "@/models/Profile";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    try {
        const existingUser = await User.findOne({ email: "admin@example.com" });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await User.create({
                email: "admin@example.com",
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

            return NextResponse.json({ message: "Admin user and default profile created: admin@example.com/admin123" });
        }

        return NextResponse.json({ message: "Admin already exists." });
    } catch (err) {
        return NextResponse.json({ error: "Failed to setup admin" }, { status: 500 });
    }
}
