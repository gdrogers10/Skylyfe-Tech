export default {
  modulePathIgnorePatterns: ['<rootDir>/.cache/'],
  watchPathIgnorePatterns: ['<rootDir>/.cache/'],
  haste: {
    forceNodeFilesystemAPI: true,
    throwOnModuleCollision: false,
  },
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/client/src/**/__tests__/**/*.test.{ts,tsx}'],
      transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        }],
      },
      transformIgnorePatterns: [
        'node_modules/(?!(wouter|regexparam)/)',
      ],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/client/src/$1',
        '^@shared/(.*)$': '<rootDir>/shared/$1',
        '^@assets/(.*)$': '<rootDir>/attached_assets/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.ts',
      },
      setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/__tests__/**/*.test.ts'],
      transform: {
        '^.+\\.tsx?$': ['@swc/jest', {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        }],
      },
      moduleNameMapper: {
        '^@shared/(.*)$': '<rootDir>/shared/$1',
      },
    },
  ],
};
