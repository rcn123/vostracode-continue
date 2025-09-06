# API Connection Fix

## Problem

Extension couldn't connect to Tabby server despite working curl command.

## Root Cause

Extension used cached config from `.continue-debug/config.yaml` instead of VostraCode defaults.

## Files Modified

1. **`/core/config/vc-default.ts`**

   - Created VostraCode default config with Tabby endpoints
   - Port: 10024, API key: auth_2a94...

2. **`/core/config/default.ts`**

   - Import and use VostraCode config

3. **`/extensions/.continue-debug/config.yaml`**

   - Fixed port: 10422 → 10024
   - Fixed API key: auth_ec02... → auth_2a94...

4. **`/core/llm/llms/OpenAI.ts`**
   - Disabled adapter for debugging
   - Added console.log for request details

## Key Findings

- All providers (openai, vllm, lmstudio) use OpenAI protocol
- `.continue-debug/` overrides defaults during development
- Tabby uses bearer tokens, not OpenAI-style API keys

## Solution

Update `.continue-debug/config.yaml` with correct port and API key.
