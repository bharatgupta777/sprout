import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Minimal typing for Node's process.env (avoids a full @types/node dependency).
declare const process: { env: Record<string, string | undefined> };

// Base path. Local dev / custom-domain hosts use "/". For GitHub Pages project
// sites the deploy workflow sets BASE_PATH (e.g. "/sprout/") so all asset URLs,
// the service worker scope, and the manifest resolve correctly under the subpath.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/*.png", "printables/activity-pack.html"],
      manifest: {
        name: "Sprout — A Learning Playground for Little Ones",
        short_name: "Sprout",
        description:
          "An audio-first, interactive learning playground for children ages 2–6.",
        theme_color: "#7c5cff",
        background_color: "#fff7ec",
        display: "standalone",
        orientation: "any",
        start_url: base,
        scope: base,
        categories: ["education", "kids", "games"],
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        navigateFallback: `${base}index.html`,
        navigateFallbackDenylist: [/printables\//],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  server: { port: 5173, open: true, host: true },
});
