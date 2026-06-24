// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig as lovableDefineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (env) => {
  const lovableConfigFn = lovableDefineConfig({
    tanstackStart: {
      server: { entry: "server" },
    },
  });
  
  const config = await lovableConfigFn(env);

  if (config.plugins) {
    // Flatten plugins and filter out vite-tsconfig-paths
    const flattenPlugins = (plugins) => {
      return plugins.reduce((acc, p) => {
        if (Array.isArray(p)) return acc.concat(flattenPlugins(p));
        if (p) acc.push(p);
        return acc;
      }, []);
    };
    
    config.plugins = flattenPlugins(config.plugins).filter(
      (p) => p.name !== "vite-tsconfig-paths"
    );
  }

  // Manually configure the alias that jsconfig.json provides
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...config.resolve.alias,
    "@": path.resolve(__dirname, "./src"),
  };

  return config;
};
