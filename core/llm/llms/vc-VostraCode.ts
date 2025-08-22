import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";

class VostraCode extends OpenAI {
  static providerName = "vostracode";
  static defaultOptions: Partial<LLMOptions> = {
    apiBase: "http://80.188.223.202:11121/v1",
    model: "qwen2.5-coder-32b",
    contextLength: 32768,
    requestOptions: {
      timeout: 30000,
    }
  };

  constructor(options: LLMOptions) {
    super(options);
    
    // Fix legacy port 10011 to correct port 11121
    this._ensureCorrectPort();
    
    if (options.model === "AUTODETECT") {
      this._setupCompletionOptions();
    }
  }

  private _ensureCorrectPort(): void {
    if (this.apiBase?.includes(':10011')) {
      console.log("🔧 VostraCode: Fixing wrong port 10011 → 11121");
      this.apiBase = this.apiBase.replace(':10011', ':11121');
    }
  }

  supportsFim(): boolean {
    return false; // vLLM doesn't support FIM by default
  }

  private _setupCompletionOptions(): void {
    // Auto-detect model setup if needed
    this.model = "qwen2.5-coder-32b";
  }
}

export default VostraCode;