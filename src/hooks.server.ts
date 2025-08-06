import { handle as authHandle } from "./auth.js"
import type { Handle } from "@sveltejs/kit"

export const handle: Handle = authHandle
