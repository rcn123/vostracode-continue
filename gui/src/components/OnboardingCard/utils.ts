import { getLocalStorage, setLocalStorage } from "../../util/localStorage";
import { OnboardingCardState } from "./OnboardingCard";
import { vcIsNewUserOnboarding } from "./vc-onboarding";

// Note that there is no "NotStarted" status since the
// local storage value is null until onboarding begins
export type OnboardingStatus = "Started" | "Completed";

// If there is no value in local storage for "onboardingStatus",
// it implies that the user has not begun or completed onboarding.
export function isNewUserOnboarding() {
  return vcIsNewUserOnboarding(); // VostraCode override
}

export const defaultOnboardingCardState: OnboardingCardState = {
  show: false,
  activeTab: undefined,
};

export enum OllamaConnectionStatuses {
  WaitingToDownload = "WaitingToDownload",
  Downloading = "Downloading",
  Connected = "Connected",
}
