import adapter from "@sveltejs/adapter-vercel"
import preprocess from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [preprocess()],
    kit: {
        adapter: adapter({
            runtime: "nodejs18.x",
        }),
        alias: {
            "@components": "$lib/components",
            "@images": "src/images/",
            "@static": "static/",
        },
    },
}

export default config
