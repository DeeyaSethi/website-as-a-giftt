"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, Plus, Loader2 } from "lucide-react";

interface Project {
    _id: string;
    title: string;
    updatedAt: string;
    config: {
        theme: string;
        colorPalette: {
            primary: string;
        };
    };
}

export function UserDashboardSection() {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const authRes = await fetch("/api/auth/me");
            if (authRes.ok) {
                const authData = await authRes.json();
                setUser(authData.user);

                // Fetch recent projects if logged in
                const projRes = await fetch("/api/projects");
                if (projRes.ok) {
                    const projData = await projRes.json();
                    // Take top 3 most recent
                    setRecentProjects(projData.projects.slice(0, 3));
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !user) return null;

    return (
        <section className="container mx-auto px-6 py-8 md:py-12 border-b border-white/50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-slate-800">
                            Your Recent Gifts
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Continue editing or start a new one
                        </p>
                    </div>

                    <Link
                        href="/create"
                        className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Gift
                    </Link>
                </div>

                {recentProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentProjects.map((project) => (
                            <Link
                                key={project._id}
                                href={`/create?projectId=${project._id}`}
                                className="group relative block bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-inner"
                                        style={{
                                            backgroundColor: `${project.config.colorPalette?.primary}15`,
                                            color: project.config.colorPalette?.primary,
                                        }}
                                    >
                                        {project.config.theme ? project.config.theme.charAt(0).toUpperCase() : 'T'}
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                        {new Date(project.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>

                                <h4 className="font-bold text-slate-800 mb-1 truncate text-lg group-hover:text-purple-700 transition-colors">
                                    {project.title}
                                </h4>

                                <div className="flex items-center text-xs font-medium text-purple-600 mt-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    Edit Gift <ArrowRight className="w-3 h-3 ml-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 text-sm">You haven't created any gifts yet.</p>
                        <Link href="/create" className="text-purple-600 text-sm font-medium hover:underline mt-1 inline-block">
                            Start your first gift &rarr;
                        </Link>
                    </div>
                )}

                <div className="mt-8 text-center md:text-right">
                    <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-purple-600 transition-colors flex items-center justify-end gap-1">
                        View all drafts <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
