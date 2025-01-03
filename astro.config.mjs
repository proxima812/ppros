// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"

// https://astro.build/config
export default defineConfig({
	site: "https://ppros.vercel.app",
	output: "server",
	integrations: [react(), tailwind()],
	adapter: vercel({ isr: { expiration: 60 * 60 * 24 }, maxDuration: 60 }),
})
