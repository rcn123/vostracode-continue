import { ConfigYaml } from "@continuedev/config-yaml";

// VostraCode configuration constants  
const VC_MODEL = "Qwen/Qwen2.5-Coder-32B-Instruct";
const VC_API_BASE = "http://80.188.223.202:10011/v1";
const VC_API_KEY = "auth_d770cd3c0b2f4502b4bc81627e24778c";

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
  systemMessage: "You are a coding assistant. When asked to edit or add code, respond ONLY with a minimal unified diff (git-style) for the changed file(s). No explanations, no prose.",
  models: [
    {
      name: "VostraCode Chat",
      provider: "vostracode",
      model: VC_MODEL,
      apiBase: VC_API_BASE,
      apiKey: VC_API_KEY,
      roles: ["chat"],
      useLegacyCompletionsEndpoint: false,
    },
    {
      name: "VostraCode Autocomplete",
      provider: "vostracode",
      model: VC_MODEL,
      apiBase: VC_API_BASE,
      apiKey: VC_API_KEY,
      roles: ["autocomplete"],
      useLegacyCompletionsEndpoint: false
    }
  ],
  context: defaultContextProvidersVsCode,

  // Enable system message tools for Agent/Plan modes (Qwen doesn't have native tool calling)
  experimental: {
    onlyUseSystemMessageTools: true,
  },

  // Optional: a slash command that ALWAYS forces diff output when you need it.
  // Usage in chat: /patch "add max(a,b) method to Calculator class in Calculator.js"
  // commands: {
  //   patch: {
  //     description: "Return only a unified diff for the requested change",
  //     prompt:
  //       "Return ONLY a minimal unified diff (git-style) for the requested change. Do not add commentary.\n\n{{input}}"
  //   }
  // }
};

export const vcDefaultConfigJetBrains: ConfigYaml = {
  name: "VostraCode Assistant",
  version: "1.0.0", 
  schema: "v1",
  systemMessage: "You are a coding assistant. When asked to edit or add code, respond ONLY with a minimal unified diff (git-style) for the changed file(s). No explanations, no prose.",
  models: [
    {
      name: "VostraCode Chat",
      provider: "vostracode",
      model: VC_MODEL,
      apiBase: VC_API_BASE,
      apiKey: VC_API_KEY, 
      roles: ["chat"],
      useLegacyCompletionsEndpoint: false,
    },
    {
      name: "VostraCode Autocomplete",
      provider: "vostracode", 
      model: VC_MODEL,
      apiBase: VC_API_BASE,
      apiKey: VC_API_KEY,
      roles: ["autocomplete"],
      useLegacyCompletionsEndpoint: false,
    },
  ],
  context: defaultContextProvidersJetBrains,

  // Enable system message tools for Agent/Plan modes (Qwen doesn't have native tool calling)
  experimental: {
    onlyUseSystemMessageTools: true,
  },
};