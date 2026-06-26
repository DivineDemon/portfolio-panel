import { FileJson, Upload } from "lucide-react";
import { useCallback, useId, useMemo, useRef } from "react";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError as FieldErrorDisplay, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { getWorkflowJsonPreview } from "@/lib/workflow-json";

type WorkflowJsonFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
};

function WorkflowJsonPreview({ value }: { value: string }) {
  const preview = useMemo(() => getWorkflowJsonPreview(value), [value]);
  if (!preview) return null;

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="mb-2 flex items-center gap-2 font-medium text-sm">
        <FileJson className="size-4" />
        Workflow preview
      </div>
      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        {preview.workflowCount > 1 && (
          <div>
            <dt className="text-muted-foreground">Workflows</dt>
            <dd className="font-medium">{preview.workflowCount}</dd>
          </div>
        )}
        <div>
          <dt className="text-muted-foreground">Nodes</dt>
          <dd className="font-medium">{preview.nodeCount}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Trigger</dt>
          <dd className="font-medium">{preview.triggerType ?? "None detected"}</dd>
        </div>
      </dl>
      {preview.integrations.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-muted-foreground text-xs">Detected integrations</p>
          <div className="flex flex-wrap gap-1.5">
            {preview.integrations.map((integration) => (
              <Badge key={integration} variant="secondary">
                {integration}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function WorkflowJsonField<T extends FieldValues>({ name, control, error }: WorkflowJsonFieldProps<T>) {
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileRead = useCallback((file: File, onChange: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsText(file);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={name}>Workflow JSON</FieldLabel>
          <p className="text-muted-foreground text-sm">
            Upload an n8n export (.json) or paste valid JSON below. Multiple workflows in one file are supported.
            Credentials are stripped on save.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              id={fileInputId}
              type="file"
              accept=".json,application/json"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) handleFileRead(file, field.onChange);
                event.target.value = "";
              }}
            />
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="size-4" />
              Upload .json
            </Button>
          </div>

          <Textarea
            id={name}
            placeholder='{"nodes": [...], "connections": {...}}'
            className="field-sizing-fixed h-72 max-h-72 min-h-48 resize-none overflow-y-auto font-mono text-sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />

          <WorkflowJsonPreview value={field.value ?? ""} />

          <FieldErrorDisplay errors={error ? [error] : undefined} />
        </Field>
      )}
    />
  );
}
