import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // TypeScript strict rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // Prevent importing server-only Supabase client from client components
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/lib/supabase/server',
              message:
                'The Supabase server client is server-only. Do not import it in client components.',
            },
          ],
        },
      ],
      // React rules
      'react/jsx-no-leaked-render': 'error',
      // General quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // Sanity studio files — relax some rules since Sanity has its own patterns
    files: ['src/sanity/**/*.ts', 'sanity.config.ts', 'sanity.cli.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // Allow console in scripts/migrations
    files: ['supabase/**/*.sql', 'scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
];

export default eslintConfig;
