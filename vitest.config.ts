import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            globals: false,
            setupFiles: ['./tests/setup.ts'],
            include: ['src/**/*.test.{ts,tsx}'],
            clearMocks: true,
            restoreMocks: true,
        },
    }),
)