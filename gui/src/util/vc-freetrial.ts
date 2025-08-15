/**
 * VostraCode Free Trial Override
 * 
 * VostraCode does not have trial limitations.
 * This file provides overrides for free trial functionality.
 */

/**
 * Check if free trial limit has been passed
 * @returns Always false for VostraCode (no trial limits)
 */
export function vcHasPassedFTL(): boolean {
  return false; // VostraCode has no trial limits
}

/**
 * Get the free trial limit
 * @returns Effectively infinite for VostraCode
 */
export const VC_FREE_TRIAL_LIMIT = Number.MAX_SAFE_INTEGER;