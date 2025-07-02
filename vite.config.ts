/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(() => {
  const isE2ETesting = process.env.VITE_E2E_TESTING === 'true'

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
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
}
})
