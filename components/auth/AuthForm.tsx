"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
    type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const endpoint = type === "login" ? "/api/auth/login" : "/api/auth/register";
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            if (type === "login" || type === "register") {
                const searchParams = new URLSearchParams(window.location.search);
                const callbackUrl = searchParams.get('callbackUrl') || "/";
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 rounded-2xl glass shadow-xl">
            <h2 className="text-3xl font-display font-bold text-center mb-8" style={{ color: '#2d3748' }}>
                {type === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-500 text-sm text-center border border-red-100">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {type === "register" && (
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#4a5568' }}>
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#4a5568' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="hello@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#4a5568' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? "Please wait..." : type === "login" ? "Sign In" : "Sign Up"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm" style={{ color: '#4a5568' }}>
                {type === "login" ? (
                    <>
                        Don't have an account?{" "}
                        <Link href="/register" className="font-semibold hover:underline" style={{ color: '#7c3aed' }}>
                            Sign up
                        </Link>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold hover:underline" style={{ color: '#7c3aed' }}>
                            Sign in
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
