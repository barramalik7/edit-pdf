import { toolsData } from "@/lib/tools-data";
import { ToolCard } from "./ToolCard";

export const ToolsGrid = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {toolsData.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
        </section>
    );
};
