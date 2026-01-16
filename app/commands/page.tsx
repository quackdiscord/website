"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import {
    commandCategories,
    getCommandCount,
    getCategoryCount,
    type Command,
    type CommandCategory,
} from "@/lib/commands";
import {
    Shield,
    FileText,
    Ticket,
    Wrench,
    ClipboardList,
    Gamepad2,
    Settings,
    Search,
    ChevronDown,
    ChevronRight,
    Flag,
    Crosshair,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    shield: Shield,
    "file-text": FileText,
    ticket: Ticket,
    "clipboard-list": ClipboardList,
    flag: Flag,
    crosshair: Crosshair,
    wrench: Wrench,
    "gamepad-2": Gamepad2,
    settings: Settings,
};

export default function CommandsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedCommands, setExpandedCommands] = useState<Set<string>>(new Set());

    const filteredCategories = commandCategories
        .map((category) => ({
            ...category,
            commands: category.commands.filter(
                (cmd) =>
                    cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter(
            (category) =>
                category.commands.length > 0 &&
                (selectedCategory === null || category.id === selectedCategory)
        );

    const toggleCommand = (commandName: string) => {
        setExpandedCommands((prev) => {
            const next = new Set(prev);
            if (next.has(commandName)) {
                next.delete(commandName);
            } else {
                next.add(commandName);
            }
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20 pb-16 px-6 lg:px-16">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            Commands
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Explore all {getCommandCount()} commands across {getCategoryCount()}{" "}
                            categories. Click on any command to see detailed usage information.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search commands..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                    selectedCategory === null
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-foreground hover:bg-secondary/80"
                                )}
                            >
                                All
                            </button>
                            {commandCategories.map((category) => {
                                const Icon = iconMap[category.icon];
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                                            selectedCategory === category.id
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-foreground hover:bg-secondary/80"
                                        )}
                                    >
                                        {Icon && <Icon className="size-4" />}
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Commands List */}
                    <div className="space-y-8">
                        {filteredCategories.map((category) => (
                            <CategorySection
                                key={category.id}
                                category={category}
                                expandedCommands={expandedCommands}
                                onToggleCommand={toggleCommand}
                            />
                        ))}

                        {filteredCategories.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground text-lg">
                                    No commands found matching your search.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function CategorySection({
    category,
    expandedCommands,
    onToggleCommand,
}: {
    category: CommandCategory;
    expandedCommands: Set<string>;
    onToggleCommand: (name: string) => void;
}) {
    const Icon = iconMap[category.icon];

    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                {Icon && (
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="size-5 text-primary" />
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-semibold text-foreground">{category.name}</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
            </div>

            <div className="grid gap-3">
                {category.commands.map((command) => (
                    <CommandCard
                        key={command.name}
                        command={command}
                        isExpanded={expandedCommands.has(command.name)}
                        onToggle={() => onToggleCommand(command.name)}
                    />
                ))}
            </div>
        </section>
    );
}

function CommandCard({
    command,
    isExpanded,
    onToggle,
}: {
    command: Command;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const hasRequiredParams = command.parameters.required.length > 0;
    const hasOptionalParams = command.parameters.optional.length > 0;

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <code className="text-primary font-mono font-semibold">/{command.name}</code>
                    <span className="text-muted-foreground text-sm hidden sm:inline">
                        {command.description}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {command.permissions && command.permissions.length > 0 && (
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded hidden sm:inline">
                            {command.permissions[0]}
                        </span>
                    )}
                    {isExpanded ? (
                        <ChevronDown className="size-5 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="size-5 text-muted-foreground" />
                    )}
                </div>
            </button>

            {isExpanded && (
                <div className="px-4 py-4 border-t border-border bg-secondary/30 space-y-4">
                    {/* Description (mobile) */}
                    <p className="text-foreground sm:hidden">{command.description}</p>

                    {/* Parameters */}
                    {(hasRequiredParams || hasOptionalParams) && (
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                                Parameters
                            </h4>
                            <div className="space-y-2">
                                {command.parameters.required.map((param) => (
                                    <ParameterRow
                                        key={param.name}
                                        param={param}
                                        required
                                    />
                                ))}
                                {command.parameters.optional.map((param) => (
                                    <ParameterRow
                                        key={param.name}
                                        param={param}
                                        required={false}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Examples */}
                    {command.examples && command.examples.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                                Examples
                            </h4>
                            <div className="space-y-1">
                                {command.examples.map((example, i) => (
                                    <code
                                        key={i}
                                        className="block text-sm bg-background px-3 py-2 rounded text-muted-foreground font-mono"
                                    >
                                        {example}
                                    </code>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Permissions */}
                    {command.permissions && command.permissions.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                                Required Permissions
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {command.permissions.map((perm) => (
                                    <span
                                        key={perm}
                                        className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded"
                                    >
                                        {perm}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {command.extra_info && (
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                                Extra Info
                            </h4>
                            <p className="text-muted-foreground">{command.extra_info}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ParameterRow({
    param,
    required,
}: {
    param: { name: string; description: string; type: string };
    required: boolean;
}) {
    const typeColors: Record<string, string> = {
        user: "text-discord-blurple bg-discord-blurple/10",
        string: "text-green-400 bg-green-400/10",
        number: "text-blue-400 bg-blue-400/10",
        channel: "text-yellow-400 bg-yellow-400/10",
        role: "text-pink-400 bg-pink-400/10",
        boolean: "text-purple-400 bg-purple-400/10",
        duration: "text-orange-400 bg-orange-400/10",
        message: "text-cyan-400 bg-cyan-400/10",
    };

    return (
        <div className="flex items-start gap-3 text-sm">
            <div className="flex items-center gap-2 min-w-[140px]">
                <code className="text-foreground font-mono">{param.name}</code>
                {required ? (
                    <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-medium">
                        Required
                    </span>
                ) : (
                    <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-medium">
                        Optional
                    </span>
                )}
            </div>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-mono", typeColors[param.type] || "text-muted-foreground bg-muted")}>
                {param.type}
            </span>
            <span className="text-muted-foreground">{param.description}</span>
        </div>
    );
}
