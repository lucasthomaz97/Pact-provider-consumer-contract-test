import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'consumer/tests/**/*.spec.ts',
      'provider/tests/**/*.spec.ts'
    ]
  }
});