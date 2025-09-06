1.  Model name (and title) Continue -> VostraCode

2.  Created a file /core/config/vc-default.ts (next to default.ts)
    With overrides specifying endpoints (completion, chat, perhaps )
    If you want to update model, do changes there

3.  Do not show OnboardingCardLanding.tsx, since model is pre-setup

    > created a vc-onboarding.ts file and override the isNewUserOnboarding() function to
    > always return false.

4.  Disable free trial, since VC doesnt have that (for now)
    Created file "vc-freetrial.ts" and calling that (from freeTrial.ts) for all functions
