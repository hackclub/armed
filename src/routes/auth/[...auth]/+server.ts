import { SvelteKitAuth } from "@auth/sveltekit"
import Slack from "@auth/sveltekit/providers/slack"
import { AUTH_SECRET, AUTH_SLACK_ID, AUTH_SLACK_SECRET } from "$env/static/private"

const { handle } = SvelteKitAuth({
  secret: AUTH_SECRET,
  providers: [
    Slack({
      clientId: AUTH_SLACK_ID,
      clientSecret: AUTH_SLACK_SECRET,
    })
  ],
})

export { handle as GET, handle as POST }
