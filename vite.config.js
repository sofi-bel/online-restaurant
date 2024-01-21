import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    root: resolve(__dirname, "src/"),
    publicDir: resolve(__dirname, "public/"),
    build: {
        outDir: resolve(__dirname, "dist/"),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
            },
        },
    },
    esbuild: {
        minifyIdentifiers: false,
        keepNames: true,
    },
    plugins: [
      viteStaticCopy({
        targets: [
          { src: "assets/images/*", dest: "assets/images/" },
          { src: "assets/styles/*", dest: "assets/styles/" },
          { src: "assets/lib/*", dest: "assets/lib/" },
          { src: "products.json", dest: "./" },
        ],
      }),
    ],
    server: {
        port: 3000,
        strictPort: true,
        open: "/",
        hmr: {
            overlay: false,
        },
    },
});
