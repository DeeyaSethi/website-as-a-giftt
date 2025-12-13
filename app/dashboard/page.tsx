"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Plus, Calendar, ArrowRight } from "lucide-react";

interface Project {
    _id: string;
    title: string;
    status: string;
    updatedAt: string;
    config: {
        theme: string;
        colorPalette: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
            text: string;
        };
        metadata: {
            recipientName?: string;
            occasion?: string;
        };
    };
}

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            if (res.ok) {
                const data = await res.json();
                setProjects(data.projects);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Your Gifts</h1>
                        <p className="mt-2 text-slate-600">
                            Manage and edit your created websites
                        </p>
                    </div>
                    <Link
                        href="/create"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Gift
                    </Link>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">
                            No gifts yet
                        </h3>
                        <p className="mt-2 text-slate-500 max-w-sm mx-auto">
                            Create your first personalized website gift for someone special today.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/create"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col"
                                style={{
                                    borderTop: `4px solid ${project.config.colorPalette?.primary || '#7c3aed'}`
                                }}
                            >
                                <div className="p-6 flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <span
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            style={{
                                                backgroundColor: `${project.config.colorPalette?.primary || '#7c3aed'}15`,
                                                color: project.config.colorPalette?.primary || '#7c3aed'
                                            }}
                                        >
                                            {project.config.theme ? project.config.theme.charAt(0).toUpperCase() + project.config.theme.slice(1) : 'Theme'}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(project.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">
                                        {project.title}
                                    </h3>

                                    {project.config.metadata?.recipientName && (
                                        <p className="text-sm text-slate-600 mb-4">
                                            For: <span className="font-medium">{project.config.metadata.recipientName}</span>
                                        </p>
                                    )}

                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                        {project.config.metadata?.occasion || "A special gift website"}
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                    <Link
                                        href={`/create?projectId=${project._id}`}
                                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/preview/live?projectId=${project._id}`}
                                        className="text-sm font-medium hover:text-opacity-80 flex items-center gap-1"
                                        style={{ color: project.config.colorPalette?.primary || '#7c3aed' }}
                                    >
                                        View <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
