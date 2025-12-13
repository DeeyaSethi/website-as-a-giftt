"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        checkAuth();
    }, [pathname]); // Re-check on route change (e.g. after login redirect)

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/me", { method: "POST" }); // Logout endpoint
            setUser(null);
            router.push("/");
            router.refresh(); // Refresh to ensure server components update if needed
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className="glass sticky top-0 z-50 border-b border-white/30">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-lg md:text-xl font-display font-bold" style={{ color: '#7c3aed' }}>
                        Website as a Gift
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium transition-colors hover:opacity-70"
                                    style={{ color: '#4a5568' }}
                                >
                                    Dashboard
                                </Link>
                                <span className="text-sm font-medium hidden md:block" style={{ color: '#4a5568' }}>
                                    Hi, {user.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium transition-colors hover:opacity-70"
                                    style={{ color: '#7c3aed' }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium transition-colors hover:opacity-70"
                                    style={{ color: '#7c3aed' }}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 md:px-6 py-2 text-sm font-medium transition-colors hover:opacity-70 btn-primary"
                                    style={{ padding: '0.5rem 1rem' }}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
