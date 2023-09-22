import { join } from "path"
import type { Config } from "tailwindcss"

// 1. Import the Skeleton plugin
import { skeleton } from "@skeletonlabs/tw-plugin"

const config = {
    // 2. Opt for dark mode to be handled via the class method
    darkMode: "class",
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        // 3. Append the path to the Skeleton package
        join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}"),
    ],
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"],
        },
        extend: {
            animation: {
                "modal-left": "modal-left 0.3s cubic-bezier(0.34, 1.4, 0.84, 1)",
                "modal-right": "modal-right 0.3s cubic-bezier(0.34, 1.4, 0.84, 1)",
            },
            keyframes: {
                "modal-left": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                "modal-right": {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                zoom: {
                    "0%": { transform: "scale(0.95)" },
                    "100%": { transform: "scale(1)" },
                },
                fade: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [
        skeleton({
            themes: {
                preset: [{ name: "crimson", enhancements: true }],
            },
        }),
    ],
} satisfies Config

export default config
