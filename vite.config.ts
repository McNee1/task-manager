import { vite } from '@million/lint';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), TanStackRouterVite(), vite()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
