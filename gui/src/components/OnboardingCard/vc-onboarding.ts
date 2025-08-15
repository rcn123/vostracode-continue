/**
 * VostraCode Onboarding Override
 * 
 * VostraCode comes pre-configured with endpoints and models.
 * Users never need to go through onboarding.
 */

/**
 * Check if user is new and needs onboarding
 * @returns Always false for VostraCode (pre-configured)
 */
export function vcIsNewUserOnboarding(): boolean {
  return false; // VostraCode users are never "new" - always pre-configured
}