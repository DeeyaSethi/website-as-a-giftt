"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { GeneratedSiteConfig } from "@/shared/types";
import { TemplateComposer } from "@/client/components/preview/TemplateComposer";

export default function LivePreviewPage() {
    const router = useRouter();
    const [siteData, setSiteData] = useState<GeneratedSiteConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load generated site data from sessionStorage
        // Since this is in an iframe, it should share the same sessionStorage as the parent
        // because it's the same origin.
        const dataStr = sessionStorage.getItem("generatedSite");
        if (!dataStr) {
            // If no data, we can't really do anything inside an iframe.
            // Maybe just show a message or try to redirect the parent?
            // For now, let's just stop loading.
            setIsLoading(false);
            return;
        }

        try {
            const parsed = JSON.parse(dataStr);
            setSiteData(parsed.site || parsed);
        } catch (error) {
            console.error("Failed to parse site data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!siteData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <p className="text-slate-500 text-center">
                    No preview data found. Please generate a site first.
                </p>
            </div>
        );
    }

    return <TemplateComposer site={siteData} />;
}
