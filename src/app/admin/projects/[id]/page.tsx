import ProjectForm from "../../components/ProjectForm";
import dbConnect from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    await dbConnect();

    const { id } = await params;
    const project = await Project.findById(id).lean();

    if (!project) {
        notFound();
    }

    // Convert raw document to plain object taking care of _id
    const serializedProject = JSON.parse(JSON.stringify(project));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
            <ProjectForm project={serializedProject} />
        </div>
    );
}
