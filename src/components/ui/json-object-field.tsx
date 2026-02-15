import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

function formatJsonObject(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "{}";
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;
    return JSON.stringify(parsed, null, 2);
  } catch {
    return null;
  }
}

type JsonObjectFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  rows?: number;
  error?: { message?: string };
  disabled?: boolean;
};

export function JsonObjectField<T extends FieldValues>({
  name,
  control,
  label = "JSON object",
  description,
  placeholder = '{"key": "value"}',
  rows = 8,
  error,
  disabled = false,
}: JsonObjectFieldProps<T>) {
  return (
    <Field>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={() => {
                  const formatted = formatJsonObject(field.value ?? "");
                  if (formatted !== null) field.onChange(formatted);
                }}
              >
                Format JSON
              </Button>
            </div>
            {description ? <FieldDescription>{description}</FieldDescription> : null}
            <Textarea
              id={name}
              placeholder={placeholder}
              className="font-mono text-sm"
              rows={rows}
              disabled={disabled}
              {...field}
              value={field.value ?? ""}
              onBlur={() => {
                const formatted = formatJsonObject(field.value ?? "");
                if (formatted !== null && formatted !== (field.value ?? "")) field.onChange(formatted);
                field.onBlur();
              }}
            />
          </>
        )}
      />
      <FieldError errors={error ? [error] : undefined} />
    </Field>
  );
}
