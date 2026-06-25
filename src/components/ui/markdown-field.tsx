import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { cn } from "@/lib/utils";

import "@uiw/react-md-editor/markdown-editor.css";

interface MarkdownFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  id?: string;
  height?: number;
  className?: string;
}

export function MarkdownField<T extends FieldValues>({
  control,
  name,
  id,
  height = 200,
  className,
}: MarkdownFieldProps<T>) {
  const { resolvedTheme } = useTheme();
  const colorMode = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          id={id}
          data-color-mode={colorMode}
          className={cn(
            "overflow-hidden rounded-md border border-input [&_.w-md-editor]:bg-transparent",
            "[&_.w-md-editor-toolbar]:border-border [&_.w-md-editor-toolbar]:bg-muted/50",
            className,
          )}
        >
          <MDEditor
            value={field.value ?? ""}
            onChange={(value) => field.onChange(value ?? "")}
            onBlur={field.onBlur}
            height={height}
            preview="edit"
            visibleDragbar={false}
            textareaProps={{
              id,
              placeholder: "Write in Markdown…",
            }}
          />
        </div>
      )}
    />
  );
}
