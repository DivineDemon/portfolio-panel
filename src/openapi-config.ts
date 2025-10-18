import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: `${process.env.VITE_BASE_API_URL}/openapi.json`,
  apiFile: "./store/services/core.ts",
  apiImport: "api",
  outputFile: "./store/services/apis.ts",
  exportName: "appApis",
  hooks: true,
  tag: true,
};

export default config;
