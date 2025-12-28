"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Header() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        checkAuth();
    }, [pathname]);

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
            await fetch("/api/auth/me", { method: "POST" });
            setUser(null);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100/50">
            <div className="container mx-auto px-4 md:px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Animated Gift Box Icon - Home Link */}
                    <Link
                        href="/"
                        className="group relative"
                        title="Home"
                    >
                        <div className="relative">
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                            {/* Gift box icon */}
                            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Right side - Icon-only navigation */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {user ? (
                            <>
                                {/* Dashboard Icon */}
                                <Link
                                    href="/dashboard"
                                    className="group relative p-2 md:p-2.5 rounded-lg hover:bg-purple-50 transition-all duration-200"
                                    title="Dashboard"
                                >
                                    <LayoutDashboard className="w-5 h-5 text-slate-600 group-hover:text-purple-600 transition-colors" />
                                    {/* Tooltip */}
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        Dashboard
                                    </span>
                                </Link>

                                {/* User greeting - minimal */}
                                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{user.name.split(' ')[0]}</span>
                                </div>

                                {/* Logout Icon */}
                                <button
                                    onClick={handleLogout}
                                    className="group relative p-2 md:p-2.5 rounded-lg hover:bg-red-50 transition-all duration-200"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5 text-slate-600 group-hover:text-red-600 transition-colors" />
                                    {/* Tooltip */}
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        Logout
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login Icon */}
                                <Link
                                    href="/login"
                                    className="group relative p-2 md:p-2.5 rounded-lg hover:bg-purple-50 transition-all duration-200"
                                    title="Login"
                                >
                                    <LogIn className="w-5 h-5 text-slate-600 group-hover:text-purple-600 transition-colors" />
                                    {/* Tooltip */}
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        Login
                                    </span>
                                </Link>

                                {/* Sign Up Button - slightly more prominent */}
                                <Link
                                    href="/register"
                                    className="group relative px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                                    title="Sign Up"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    <span className="text-sm font-medium hidden sm:inline">Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
