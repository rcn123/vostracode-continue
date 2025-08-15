import { ConfigYaml } from "@continuedev/config-yaml";
import {
  vcDefaultConfig,
  vcDefaultConfigJetBrains,
  defaultContextProvidersVsCode,
  defaultContextProvidersJetBrains,
} from "./vc-default";

export { defaultContextProvidersVsCode, defaultContextProvidersJetBrains };

export const defaultConfig: ConfigYaml = vcDefaultConfig;
export const defaultConfigJetBrains: ConfigYaml = vcDefaultConfigJetBrains;
