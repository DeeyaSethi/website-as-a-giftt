import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Project from "@/lib/models/Project";
import { TemplateComposer } from "@/components/preview/TemplateComposer";
import { Metadata } from "next";

// Disable caching for this dynamic route to ensure fresh data
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
    await dbConnect();
    // Use .lean() to get a plain JavaScript object instead of a Mongoose document
    const project = await Project.findOne({ slug }).select('config title').lean();
    if (!project) return null;
    // Deep clone/serialize to ensure no non-serializable properties like ObjectIds remain if nested
    return JSON.parse(JSON.stringify(project));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) return { title: 'Project Not Found' };

    return {
        title: project.title,
        description: `A personalized website gift for ${project.config.recipientName || 'someone special'}.`,
    };
}

export default async function PublicProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    // Pass site data to the composer
    return <TemplateComposer site={project.config} />;
}
