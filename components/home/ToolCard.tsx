import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    isNew?: boolean;
    allowMultiple?: boolean;
}

interface ToolCardProps {
    tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
    const Icon = tool.icon;

    return (
        <Link
            href={tool.href}
            className="group bg-white p-6 rounded-lg border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full relative"
        >
            {tool.isNew && (
                <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    New
                </span>
            )}
            <div className="mb-4 text-primary">
                <Icon size={44} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                {tool.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
                {tool.description}
            </p>
        </Link>
    );
};
