// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { DefaultSession } from "@auth/core/types"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth(): Promise<DefaultSession | null>
		}
		interface PageData {
			session: DefaultSession | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
