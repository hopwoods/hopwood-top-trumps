/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ mode: _unusedMode }) => { // Destructure mode to an unused variable
  const isE2ETesting = process.env.E2E_TESTING === 'true'
  // _unusedMode is now declared and satisfies the function signature.
  // The eslint-disable comment above handles the ESLint rule.

  const httpsConfig = isE2ETesting
    ? undefined // Use undefined to disable https
    : {
        key: fs.readFileSync(path.resolve(__dirname, '.certs/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '.certs/cert.pem')),
      }

  return {
    plugins: [react()],
    server: {
      https: httpsConfig,
      // You can specify a port if needed, Vite defaults to 5173
      // port: 5173,
    // host: true, // Uncomment to expose on your network
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    // You might want to add these if you're using CSS modules or similar
    // css: true,
  },
}
})
