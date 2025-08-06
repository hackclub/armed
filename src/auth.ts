import { SvelteKitAuth } from "@auth/sveltekit"
import Slack from "@auth/sveltekit/providers/slack"
import { AUTH_SECRET, AUTH_SLACK_ID, AUTH_SLACK_SECRET } from "$env/static/private"

export const { handle, signIn, signOut } = SvelteKitAuth({
  secret: AUTH_SECRET,
  providers: [
    Slack({
      clientId: AUTH_SLACK_ID,
      clientSecret: AUTH_SLACK_SECRET,
    })
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
})
