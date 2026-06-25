import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ProjectMetricValue } from "@/lib/form-schemas";
import { cn } from "@/lib/utils";

type MetricRowType = "string" | "number" | "boolean" | "array";

type MetricRow = {
  id: string;
  key: string;
  type: MetricRowType;
  value: string;
};

const selectClassName = cn(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

function createRowId(): string {
  return `metric-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function parseMetricsJson(value: string): MetricRow[] {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "{}") return [];

  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return [];
    }

    return Object.entries(parsed).map(([key, rawValue]) => {
      if (typeof rawValue === "boolean") {
        return { id: createRowId(), key, type: "boolean", value: rawValue ? "true" : "false" };
      }
      if (typeof rawValue === "number") {
        return { id: createRowId(), key, type: "number", value: String(rawValue) };
      }
      if (Array.isArray(rawValue)) {
        return {
          id: createRowId(),
          key,
          type: "array",
          value: rawValue.map(String).join(", "),
        };
      }
      if (rawValue === null) {
        return { id: createRowId(), key, type: "string", value: "" };
      }
      return { id: createRowId(), key, type: "string", value: String(rawValue) };
    });
  } catch {
    return [];
  }
}

function serializeMetricRows(rows: MetricRow[]): string {
  const metrics: Record<string, ProjectMetricValue> = {};

  for (const row of rows) {
    const key = row.key.trim();
    if (!key) continue;

    switch (row.type) {
      case "boolean":
        metrics[key] = row.value === "true";
        break;
      case "number": {
        const num = Number(row.value);
        metrics[key] = Number.isFinite(num) ? num : row.value;
        break;
      }
      case "array":
        metrics[key] = row.value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        break;
      default:
        metrics[key] = row.value;
        break;
    }
  }

  return JSON.stringify(metrics);
}

type MetricsKeyValueFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: string;
  error?: { message?: string };
  disabled?: boolean;
};

export function MetricsKeyValueField<T extends FieldValues>({
  name,
  control,
  label = "Metrics",
  description = "Key stats shown in the above-fold snapshot on the case study page.",
  error,
  disabled = false,
}: MetricsKeyValueFieldProps<T>) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MetricsKeyValueEditor value={field.value ?? "{}"} disabled={disabled} onChange={field.onChange} />
        )}
      />
      <FieldError errors={error ? [error] : undefined} />
    </Field>
  );
}

function MetricsKeyValueEditor({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [rows, setRows] = useState<MetricRow[]>(() => parseMetricsJson(value));

  const syncRows = (nextRows: MetricRow[]) => {
    setRows(nextRows);
    onChange(serializeMetricRows(nextRows));
  };

  const addRow = () => {
    syncRows([...rows, { id: createRowId(), key: "", type: "string", value: "" }]);
  };

  const updateRow = (id: string, patch: Partial<MetricRow>) => {
    syncRows(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  };

  const removeRow = (id: string) => {
    syncRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="space-y-3">
      {rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">No metrics yet. Add a row to populate the snapshot grid.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 gap-2 rounded-lg border p-3 md:grid-cols-[1fr_120px_1fr_auto]"
            >
              <Input
                placeholder="Label (e.g. portals)"
                value={row.key}
                disabled={disabled}
                onChange={(event) => updateRow(row.id, { key: event.target.value })}
              />
              <select
                className={selectClassName}
                value={row.type}
                disabled={disabled}
                onChange={(event) =>
                  updateRow(row.id, {
                    type: event.target.value as MetricRowType,
                    value: event.target.value === "boolean" ? "true" : row.value,
                  })
                }
              >
                <option value="string">Text</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="array">List</option>
              </select>
              {row.type === "boolean" ? (
                <select
                  className={selectClassName}
                  value={row.value}
                  disabled={disabled}
                  onChange={(event) => updateRow(row.id, { value: event.target.value })}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              ) : (
                <Input
                  placeholder={row.type === "array" ? "Comma-separated values" : "Value"}
                  value={row.value}
                  disabled={disabled}
                  onChange={(event) => updateRow(row.id, { value: event.target.value })}
                />
              )}
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={disabled}
                onClick={() => removeRow(row.id)}
                aria-label="Remove metric"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button type="button" variant="outline" size="sm" disabled={disabled} onClick={addRow}>
        <Plus className="size-4" />
        Add metric
      </Button>
    </div>
  );
}
