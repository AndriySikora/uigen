import { Loader2 } from "lucide-react";

interface ToolInvocationDisplayProps {
  toolName: string;
  input: Record<string, unknown>;
  state: string;
}

function getLabel(
  toolName: string,
  args: Record<string, unknown>,
  completed: boolean
): string {
  const path = typeof args.path === "string" ? args.path : "";
  const command = typeof args.command === "string" ? args.command : "";

  if (toolName === "str_replace_editor") {
    switch (command) {
      case "create":
        return completed ? `Created ${path}` : `Creating ${path}`;
      case "str_replace":
      case "insert":
        return completed ? `Updated ${path}` : `Updating ${path}`;
      case "view":
        return completed ? `Viewed ${path}` : `Viewing ${path}`;
    }
  }

  if (toolName === "file_manager") {
    const newPath = typeof args.new_path === "string" ? args.new_path : "";
    switch (command) {
      case "delete":
        return completed ? `Deleted ${path}` : `Deleting ${path}`;
      case "rename":
        return completed
          ? `Renamed ${path} → ${newPath}`
          : `Renaming ${path}`;
    }
  }

  return toolName;
}

export function ToolInvocationDisplay({
  toolName,
  input,
  state,
}: ToolInvocationDisplayProps) {
  const completed = state === "output-available";
  const label = getLabel(toolName, input, completed);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {completed ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-green-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
