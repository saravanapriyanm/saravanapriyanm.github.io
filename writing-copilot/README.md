# Writing Copilot - AI-Powered Markdown Editor

A markdown editor with live preview and AI assistance for enhanced writing experience.

## Features

### 1. **Markdown Editor with Live Preview**
- Write in markdown on the left panel
- See live HTML preview on the right panel
- Auto-save to local storage every 5 seconds

### 2. **AI-Powered Synonym Suggestions**
- Select any single word in the editor
- Context menu appears with synonym suggestions
- Click any synonym to replace the selected word
- Powered by Azure OpenAI or Google Gemini

### 3. **AI Autofill**
- Press Enter to create a new line
- AI suggests the next sentence based on context
- Press Tab to accept the suggestion
- Suggestion auto-hides after 10 seconds

### 4. **AI Configuration**
- Optional AI setup - editor works without AI
- Supports Azure OpenAI and Google Gemini
- Credentials stored securely in browser's local storage
- Validate credentials before saving

## Getting Started

### Without AI (Basic Markdown Editor)
1. Open `index.html` in your browser
2. Start writing in markdown in the left panel
3. See live preview on the right panel

### With AI Features

#### Option 1: Azure OpenAI
1. Click the "⚙️ Settings" button
2. Select "Azure OpenAI" as provider
3. Enter:
   - **Endpoint**: Your Azure OpenAI resource endpoint (e.g., `https://your-resource.openai.azure.com/`)
   - **API Key**: Found in Azure Portal under Keys and Endpoint
   - **Deployment Name**: Your model deployment name (e.g., `gpt-4`)
4. Click "Validate & Save Configuration"

#### Option 2: Google Gemini
1. Click the "⚙️ Settings" button
2. Select "Google Gemini" as provider
3. Enter:
   - **API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **Model**: Choose between Gemini Pro or Gemini Pro Latest
4. Click "Validate & Save Configuration"

## How to Use AI Features

### Synonym Suggestions
1. Write some text in the editor
2. Select any single word (double-click or click-drag)
3. Context menu appears with 5 synonym suggestions
4. Click any synonym to replace the word

### Autofill Sentences
1. Write a few sentences (at least 10 characters)
2. Press Enter to create a new line
3. AI will suggest the next sentence
4. Press Tab to accept the suggestion
5. Continue writing or press Escape to dismiss

## Technical Stack

- **AlpineJS**: For reactive UI components
- **Marked.js**: For markdown to HTML conversion
- **Azure OpenAI API**: Optional AI provider
- **Google Gemini API**: Optional AI provider
- **Pure Browser JavaScript**: No build tools or npm required

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Privacy & Security

- All credentials stored in browser's local storage only
- No data sent to any server except your chosen AI provider
- Markdown content auto-saved locally
- Clear settings anytime to remove stored credentials

## Keyboard Shortcuts

- **Tab**: Accept autofill suggestion
- **Enter**: Trigger new line (with autofill if AI enabled)
- **Ctrl/Cmd + A**: Select all text

## Notes

- AI features are completely optional
- Editor works perfectly without AI configuration
- Credentials never leave your browser
- Fallback synonyms provided for common words when AI is not configured
