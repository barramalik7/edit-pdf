import { notFound } from "next/navigation";
import { toolsData } from "@/lib/tools-data";
import { UploadView } from "@/components/layout/UploadView";
import React from "react";

// Tools that do NOT use the UploadView (non-PDF inputs)
const EXCLUDED_TOOLS = [
    "powerpoint-to-pdf",
    "excel-to-pdf",
    "jpg-to-pdf",
    "word-to-pdf",
    "scan-to-pdf",
];

export function generateStaticParams() {
    return toolsData.map((tool) => ({
        slug: tool.href.replace(/^\//, ""),
    }));
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    // Await params directly in Server Component
    const { slug } = await params;
    const tool = toolsData.find((t) => t.href === `/${slug}`);

    if (!tool) {
        notFound();
    }

    const isExcluded = EXCLUDED_TOOLS.includes(tool.id);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Tool Header */}
            <div className="pt-20 pb-8 text-center px-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
                    {tool.title}
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                    {tool.description}
                </p>
            </div>

            {/* Tool Content */}
            <div className="flex-1 flex flex-col items-center px-4 pb-20">
                {isExcluded ? (
                    <div className="w-full max-w-lg p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-surface/50">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <tool.icon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                            COMING SOON
                        </h3>
                        <p className="text-text-secondary">
                            The upload interface for {tool.title} is currently under development.
                        </p>
                    </div>
                ) : (
                    <UploadView allowMultiple={tool.allowMultiple} />
                )}
            </div>
        </div>
    );
}
