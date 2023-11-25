import { enhancedImages } from "@sveltejs/enhanced-img"
import { sveltekit } from "@sveltejs/kit/vite"
import type { UserConfig } from "vite"

const config: UserConfig = {
    plugins: [enhancedImages(), sveltekit()],
}

export default config
