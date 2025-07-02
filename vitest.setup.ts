// vitest.setup.ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Firebase Analytics to prevent errors in test environment
vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(),
  isSupported: vi.fn(() => Promise.resolve(false)), // Say it's not supported
}));

// You can add other global setup here if needed, for example:
// import { server } from './src/mocks/server' // if using MSW
//
// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())
