import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        tailwindcss(),
    ],
    base: "/cld/",
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("@phosphor-icons")) {
                        return "vendor-icons";
                    }
                    if (id.includes("motion")) {
                        return "vendor-motion";
                    }
                },
            },
        },
    },
});
