# ARMED - Assembly Guide App

A SvelteKit application for learning ARM assembly programming with interactive guides and editor.

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run check
```

## 🏗️ Building for Production

### Using Nixpacks (Coolify)

**Build Command:** `npm run build`

The app is configured with `@sveltejs/adapter-auto` which automatically detects the deployment environment and configures accordingly.

### Using Docker

**Build and run:**
```bash
# Build the Docker image
docker build -t armed-app .

# Run the container
docker run -p 3000:3000 \
  -e AUTH_SECRET=your_secret \
  -e AUTH_SLACK_ID=your_slack_id \
  -e AUTH_SLACK_SECRET=your_slack_secret \
  armed-app
```

**Or use Docker Compose:**
```bash
# Create .env file with your variables
cp .env.example .env

# Start the application
docker-compose up -d
```

### Environment Variables

Copy `.env.example` to `.env` and set:

```env
AUTH_SECRET=your_secure_random_32_character_secret
AUTH_SLACK_ID=your_slack_client_id
AUTH_SLACK_SECRET=your_slack_client_secret
```

### Slack OAuth Setup

1. Create a Slack app at https://api.slack.com/apps
2. Set OAuth callback URL to: `https://your-domain.com/auth/callback/slack`
3. Add OAuth scopes: `openid`, `profile`, `email`
4. Copy Client ID and Secret to environment variables

## 📁 Project Structure

- `/src/routes/` - SvelteKit file-based routing
- `/src/routes/editor/` - ARM assembly editor with auth & stopwatch
- `/src/routes/assembly_guide/` - Interactive assembly tutorials
- `/src/auth.ts` - Authentication configuration
- `/static/` - Static assets

## 🔐 Authentication

Uses Auth.js with Slack OAuth provider. Features:
- Sign in with Slack
- Session management
- Integrated stopwatch for coding sessions

## 🎨 Styling

- TailwindCSS 4.x with typography plugin
- Retro terminal aesthetic with scan line effects
- Custom fuchsia color scheme
