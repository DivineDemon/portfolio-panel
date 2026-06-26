import { z } from "zod";
import type { PostApiN8NWorkflowsApiArg } from "@/store/services/apis";

export type WorkflowJsonObject = PostApiN8NWorkflowsApiArg["body"]["workflowJson"];

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

export const workflowJsonStringSchema = z.string().superRefine((val, ctx) => {
  const trimmed = val.trim();
  if (!trimmed) {
    ctx.addIssue({ code: "custom", message: "Workflow JSON is required" });
    return;
  }
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    const result = workflowJsonObjectSchema.safeParse(parsed);
    if (!result.success) {
      ctx.addIssue({
        code: "custom",
        message: "Workflow JSON must include valid nodes and connections",
      });
    }
  } catch (error) {
    ctx.addIssue({
      code: "custom",
      message: error instanceof Error ? `Invalid JSON: ${error.message}` : "Invalid JSON",
    });
  }
});

export function parseWorkflowJsonString(value: string): WorkflowJsonObject {
  const parsed = JSON.parse(value.trim()) as unknown;
  return workflowJsonObjectSchema.parse(parsed);
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

export function getWorkflowJsonPreview(value: string) {
  try {
    const workflow = parseWorkflowJsonString(value);
    return {
      nodeCount: workflow.nodes.length,
      triggerType: findTriggerType(workflow.nodes),
      integrations: extractIntegrationsFromNodes(workflow.nodes),
    };
  } catch {
    return null;
  }
}
