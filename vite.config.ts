/* eslint-disable */
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['xo.config.*']
    }
  },
})