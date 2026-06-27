import { z } from "zod";

const N8nJsonLeafSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

const N8nJsonNestedRecordSchema = z.record(z.string(), N8nJsonLeafSchema);

const N8nJsonArraySchema = z.array(z.union([N8nJsonLeafSchema, N8nJsonNestedRecordSchema]));

const N8nJsonValueSchema = z.union([
  N8nJsonLeafSchema,
  N8nJsonNestedRecordSchema,
  N8nJsonArraySchema,
  z.array(N8nJsonNestedRecordSchema),
  z.record(z.string(), z.union([N8nJsonLeafSchema, N8nJsonNestedRecordSchema, N8nJsonArraySchema])),
]);

const N8nNodePositionSchema = z.union([z.tuple([z.number(), z.number()]), z.object({ x: z.number(), y: z.number() })]);

const N8nNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  typeVersion: z.union([z.number(), z.string()]).optional(),
  position: N8nNodePositionSchema,
  parameters: z.record(z.string(), N8nJsonValueSchema).optional(),
  credentials: z
    .record(
      z.string(),
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
      }),
    )
    .optional(),
  disabled: z.boolean().optional(),
  notes: z.string().optional(),
  webhookId: z.string().optional(),
  continueOnFail: z.boolean().optional(),
  alwaysOutputData: z.boolean().optional(),
  executeOnce: z.boolean().optional(),
  retryOnFail: z.boolean().optional(),
  maxTries: z.number().optional(),
  waitBetweenTries: z.number().optional(),
  onError: z.string().optional(),
});

const N8nConnectionTargetSchema = z.object({
  node: z.string(),
  type: z.string(),
  index: z.number(),
});

const N8nConnectionsSchema = z.record(z.string(), z.record(z.string(), z.array(z.array(N8nConnectionTargetSchema))));

export const workflowJsonObjectSchema = z.object({
  name: z.string().optional(),
  active: z.boolean().optional(),
  nodes: z.array(N8nNodeSchema),
  connections: N8nConnectionsSchema,
  settings: z
    .object({
      executionOrder: z.enum(["v0", "v1"]).optional(),
      timezone: z.string().optional(),
      saveManualExecutions: z.boolean().optional(),
      saveDataErrorExecution: z.enum(["all", "none"]).optional(),
      saveDataSuccessExecution: z.enum(["all", "none"]).optional(),
      callerPolicy: z.string().optional(),
      errorWorkflow: z.string().optional(),
    })
    .optional(),
  staticData: z.record(z.string(), N8nJsonValueSchema).optional(),
  pinData: z.record(z.string(), N8nJsonValueSchema).optional(),
  meta: z.record(z.string(), N8nJsonValueSchema).optional(),
  tags: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      }),
    )
    .optional(),
  versionId: z.string().optional(),
  id: z.string().optional(),
});

/** Canonical workflow JSON shape — kept in panel to avoid `any` from OpenAPI codegen. */
export type WorkflowJsonObject = z.infer<typeof workflowJsonObjectSchema>;

/** Parse one or more JSON values from a string (supports concatenated JSON objects). */
export function parseJsonValues(input: string): unknown[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  try {
    return [JSON.parse(trimmed)];
  } catch {
    // Fall through to incremental parse for multiple concatenated values.
  }

  const values: unknown[] = [];
  let index = 0;

  while (index < trimmed.length) {
    while (index < trimmed.length && /\s/.test(trimmed[index]!)) index++;
    if (index >= trimmed.length) break;

    let found = false;
    for (let end = index + 1; end <= trimmed.length; end++) {
      try {
        values.push(JSON.parse(trimmed.slice(index, end)));
        index = end;
        found = true;
        break;
      } catch {
        // Extend slice until JSON.parse succeeds.
      }
    }

    if (!found) {
      throw new SyntaxError(`Unexpected token at position ${index + 1}`);
    }
  }

  return values;
}

export const workflowJsonStringSchema = z.string().superRefine((val, ctx) => {
  const trimmed = val.trim();
  if (!trimmed) {
    ctx.addIssue({ code: "custom", message: "Workflow JSON is required" });
    return;
  }
  try {
    parseJsonValues(trimmed);
  } catch (error) {
    ctx.addIssue({
      code: "custom",
      message: error instanceof Error ? `Invalid JSON: ${error.message}` : "Invalid JSON",
    });
  }
});

export function parseWorkflowJsonString(value: string): WorkflowJsonObject {
  const values = parseJsonValues(value);
  if (values.length === 0) {
    throw new Error("Workflow JSON is required");
  }
  const parsed = values.length === 1 ? values[0] : values;
  return parsed as WorkflowJsonObject;
}

export function formatNodeTypeShort(type: unknown): string {
  if (typeof type !== "string") return "Unknown";
  const suffix = type.split(".").pop() ?? type;
  return suffix
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

export function extractIntegrationsFromNodes(nodes: WorkflowJsonObject["nodes"]): string[] {
  const integrations = new Set<string>();
  for (const node of nodes) {
    if (node.type.includes("Trigger")) continue;
    const shortName = formatNodeTypeShort(node.type);
    if (shortName) integrations.add(shortName);
  }
  return Array.from(integrations).sort();
}

export function findTriggerType(nodes: WorkflowJsonObject["nodes"]): string | null {
  const trigger = nodes.find((node) => node.type.toLowerCase().includes("trigger"));
  return trigger ? formatNodeTypeShort(trigger.type) : null;
}

function extractWorkflowPreview(workflow: unknown) {
  if (!workflow || typeof workflow !== "object" || !("nodes" in workflow)) return null;
  const nodes = workflow.nodes;
  if (!Array.isArray(nodes)) return null;

  return {
    nodeCount: nodes.length,
    triggerType: findTriggerType(nodes as WorkflowJsonObject["nodes"]),
    integrations: extractIntegrationsFromNodes(nodes as WorkflowJsonObject["nodes"]),
  };
}

function collectWorkflowPreviews(values: unknown[]) {
  const previews = values.flatMap((value) => {
    if (Array.isArray(value)) {
      return value.map(extractWorkflowPreview).filter((preview) => preview !== null);
    }
    const preview = extractWorkflowPreview(value);
    return preview ? [preview] : [];
  });
  return previews;
}

export function getWorkflowJsonPreview(value: string) {
  try {
    const values = parseJsonValues(value);
    const previews = collectWorkflowPreviews(values);
    if (previews.length === 0) return null;

    if (previews.length === 1) {
      return { workflowCount: 1, ...previews[0]! };
    }

    return {
      workflowCount: previews.length,
      nodeCount: previews.reduce((sum, preview) => sum + preview.nodeCount, 0),
      triggerType: previews[0]!.triggerType,
      integrations: [...new Set(previews.flatMap((preview) => preview.integrations))].sort(),
    };
  } catch {
    return null;
  }
}
