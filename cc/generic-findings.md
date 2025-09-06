# Generic Findings - VostraCode Rebranding

## OnboardingCard Component

### What It Is

The OnboardingCard is the setup/configuration panel that appears when users first use Continue or when they need to configure their models. It shows:

- Header with "Continue" logo
- Text "Log in to access a free trial of the Models Add-On"
- Options to configure models or log in

### File Locations

#### Main Component Files

- **OnboardingCard Component**: `/gui/src/components/OnboardingCard/OnboardingCard.tsx`
- **Landing Page**: `/gui/src/components/OnboardingCard/components/OnboardingCardLanding.tsx`
  - Line 54: `<ContinueLogo height={75} />` - The "Continue" header/logo
  - Lines 72-85: "Log in to access a free trial of the Models Add-On" text
- **Models Add-On Tab**: `/gui/src/components/OnboardingCard/components/OnboardingModelsAddOnTab.tsx`
  - Contains the pricing and tier information

#### Logo Component

- **ContinueLogo SVG**: `/gui/src/components/svg/ContinueLogo.tsx` - The actual logo component

### Visibility Control Logic

The OnboardingCard visibility is controlled by multiple factors:

#### 1. Local Storage Keys

- `onboardingStatus`: Can be `undefined`, `"Started"`, or `"Completed"`
- `hasDismissedOnboardingCard`: Boolean flag if user has dismissed the card

#### 2. Redux State

- Located in: `/gui/src/redux/slices/uiSlice.ts`
- State property: `state.ui.onboardingCard` with fields:
  - `show`: Boolean to explicitly show/hide
  - `activeTab`: Which tab is active (API_KEY, LOCAL, MODELS_ADD_ON)

#### 3. Visibility Logic (from `useOnboardingCard` hook)

Located in: `/gui/src/components/OnboardingCard/hooks/useOnboardingCard.ts`

```javascript
// Lines 31-39
let show: boolean;

// Always show if explicitly set (e.g., free trial exceeded)
if (onboardingCard.show) {
  show = true;
} else {
  // Show if not completed AND not dismissed
  show = onboardingStatus !== "Completed" && !hasDismissedOnboardingCard;
}
```

#### 4. Automatic Triggers

Located in: `/gui/src/components/Layout.tsx`

- **New User Check** (Lines 237-243):

  - Shows automatically on home page if `isNewUserOnboarding()` returns true
  - `isNewUserOnboarding()` returns true when `onboardingStatus` is undefined in localStorage

- **Free Trial Exceeded** (Lines 154-168):

  - Listens for `"freeTrialExceeded"` webview message
  - Opens dialog with OnboardingCard showing Models Add-On tab

- **Manual Triggers** via webview messages:
  - `"setupLocalConfig"` - Opens with LOCAL tab
  - `"setupApiKey"` - Opens with API_KEY tab

### Where It's Rendered

- **EmptyChatBody**: `/gui/src/pages/gui/EmptyChatBody.tsx` (Lines 10-15)
  - Shown in main chat area when `showOnboardingCard` prop is true
- **Chat Component**: `/gui/src/pages/gui/Chat.tsx` (Line 454)
  - Passes `onboardingCard.show` to EmptyChatBody

### Summary of Visibility Rules

1. **New users**: Shown automatically on first visit (no onboardingStatus in localStorage)
2. **Returning users**: Hidden if onboardingStatus is "Completed" OR hasDismissedOnboardingCard is true
3. **Free trial exceeded**: Force shown as a dialog
4. **Manual triggers**: Can be opened via IDE commands/messages
5. **Can be closed**: If user has configured models, shows close button

## VS Code Extension Panel Titles

### Location

`/extensions/vscode/package.json`

- **Line 618**: `"title": "VostraCode"` - Activity bar container title
- **Line 635**: `"name": "VostraCode"` - View name inside container
- **Line 625**: `"title": "VostraCode Console"` - Console panel title

VS Code displays these as either:

- Just the title if container and view names match
- "ContainerTitle : ViewName" if they differ

## Custom Model Endpoints Configuration

### Configuration File Location

Continue uses configuration files stored in your home directory:

- **Primary location**: `~/.continue/` (or `%USERPROFILE%\.continue\` on Windows)
- **Config files**:
  - `~/.continue/config.yaml` (preferred, newer format)
  - `~/.continue/config.json` (legacy format)
- **Path defined in**: `/core/util/paths.ts` (line 25)

### Setting Up Custom Endpoints (e.g., Tabby)

You can configure custom endpoints for chat, completion, and embeddings in the config.yaml file:

#### Example Configuration for Tabby or OpenAI-Compatible Endpoints

```yaml
models:
  # Chat Model
  - name: My Tabby Chat
    provider: openai # Use openai provider for OpenAI-compatible APIs
    model: your-model-name
    apiBase: http://80.188.223.202:10422/v1 # Your custom endpoint
    apiKey: auth_0d975e50fb69456b825b9bbc8fc5ba73 # Your auth token
    roles:
      - chat

  # Completion/Autocomplete Model
  - name: My Tabby Autocomplete
    provider: openai
    model: your-completion-model
    apiBase: http://80.188.223.202:10422/v1
    apiKey: auth_0d975e50fb69456b825b9bbc8fc5ba73
    roles:
      - autocomplete

  # Embeddings Model (if available)
  - name: My Tabby Embeddings
    provider: openai
    model: your-embedding-model
    apiBase: http://80.188.223.202:10422/v1
    apiKey: auth_0d975e50fb69456b825b9bbc8fc5ba73
    roles:
      - embed
```

#### Alternative: Using Request Headers

If your endpoint uses custom headers instead of standard Bearer tokens:

```yaml
models:
  - name: My Custom Model
    provider: openai
    model: model-name
    apiBase: http://your-endpoint/v1
    requestOptions:
      headers:
        Authorization: "Bearer your-token"
        # Or custom headers:
        X-Auth-Token: your-token
    roles:
      - chat
      - autocomplete
```

### Model Roles

Each model can have one or more roles:

- `chat` - For chat conversations
- `autocomplete` - For code completion/tab autocomplete
- `embed` - For generating embeddings
- `edit` - For code editing tasks
- `apply` - For applying code changes
- `rerank` - For reranking search results

### Key Files for Model Configuration

- **Config path utilities**: `/core/util/paths.ts`
- **Default config**: `/core/config/default.ts`
- **OpenAI provider implementation**: `/core/llm/llms/OpenAI.ts`
  - Line 63: Default apiBase for OpenAI
- **Config examples**: `/docs/reference/yaml-migration.mdx`
