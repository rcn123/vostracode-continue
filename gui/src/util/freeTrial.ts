import { getLocalStorage, setLocalStorage } from "./localStorage";
import { vcHasPassedFTL } from "./vc-freetrial";

export const FREE_TRIAL_LIMIT_REQUESTS = 50;

export function hasPassedFTL(): boolean {
  return vcHasPassedFTL(); // VostraCode override
}

export function incrementFreeTrialCount(): number {
  const u = getLocalStorage("ftc") ?? 0;
  setLocalStorage("ftc", u + 1);
  return u + 1;
}
