export const toolCursors: Record<string, string> = {
  "idle": "cursor-auto",
  "add-sticker": "cursor-note",
};

export function getCursorClass(tool: string): string {
  return toolCursors[tool] ?? "cursor-auto";
}
