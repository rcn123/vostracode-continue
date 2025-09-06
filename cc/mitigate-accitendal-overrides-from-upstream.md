Here's how the patches will behave and what protections we have:

What happens when patches are applied:

✅ Will get warnings/failures:

- If upstream modifies the exact lines we patched
- If files are moved/renamed
- If function signatures change

⚠️ Might silently break:

- If upstream adds new code paths that bypass our overrides
- If new functions are created that don't use our overridden functions

Protection strategies:

1. Our current approach is good because:

- We patch "chokepoint" functions (hasPassedFTL, isNewUserOnboarding)
- All other code flows through these functions
- TypeScript will catch import/signature errors

2. Additional protections we could add:

Tests:

- Unit tests that verify hasPassedFTL() returns false
- Unit tests that verify isNewUserOnboarding() returns false
- Integration tests that verify OnboardingCard doesn't show

Runtime assertions:

- Add console warnings if unexpected values are detected
- Add startup checks that verify our overrides are working

Build-time checks:

- TypeScript strict mode catches many issues
- ESLint rules to prevent certain patterns

Documentation:

- Clear comments in our vc-\* files explaining what they override
- Update patches with descriptive commit messages

The patch workflow gives us explicit failure when conflicts occur, which is much better than silent breakage. Tests
would be the best additional protection.
