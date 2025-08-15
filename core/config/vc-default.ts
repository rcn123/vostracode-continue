import { ConfigYaml } from "@continuedev/config-yaml";

export const defaultContextProvidersVsCode: NonNullable<
  ConfigYaml["context"]
>[number][] = [
  { provider: "code" },
  { provider: "docs" },
  { provider: "diff" },
  { provider: "terminal" },
  { provider: "problems" },
  { provider: "folder" },
  { provider: "codebase" },
];

export const defaultContextProvidersJetBrains: NonNullable<
  ConfigYaml["context"]
>[number][] = [
  { provider: "diff" },
  { provider: "folder" },
  { provider: "codebase" },
];

export const vcDefaultConfig: ConfigYaml = {
  name: "VostraCode Assistant",
  version: "1.0.0",
  schema: "v1",
  models: [
    {
      name: "VostraCode Chat",
      provider: "openai",
      model: "qwen2.5-coder-1.5b",
      apiBase: "http://80.188.223.202:10024/v1/",
      apiKey: "auth_2a94a8ce08284c74a8562ee003152eb3",
      roles: ["chat"],
    },
    {
      name: "VostraCode Autocomplete", 
      provider: "openai",
      model: "qwen2.5-coder-1.5b",
      apiBase: "http://80.188.223.202:10024/v1/",
      apiKey: "auth_2a94a8ce08284c74a8562ee003152eb3",
      roles: ["autocomplete"],
    },
  ],
  context: defaultContextProvidersVsCode,
};

export const vcDefaultConfigJetBrains: ConfigYaml = {
  name: "VostraCode Assistant",
  version: "1.0.0", 
  schema: "v1",
  models: [
    {
      name: "VostraCode Chat",
      provider: "openai",
      model: "qwen2.5-coder-1.5b",
      apiBase: "http://80.188.223.202:10024/v1/",
      apiKey: "auth_2a94a8ce08284c74a8562ee003152eb3", 
      roles: ["chat"],
    },
    {
      name: "VostraCode Autocomplete",
      provider: "openai", 
      model: "qwen2.5-coder-1.5b",
      apiBase: "http://80.188.223.202:10024/v1/",
      apiKey: "auth_2a94a8ce08284c74a8562ee003152eb3",
      roles: ["autocomplete"],
    },
  ],
  context: defaultContextProvidersJetBrains,
};