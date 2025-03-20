import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import importPlugin from 'eslint-plugin-import' // Importe o plugin corretamente

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: importPlugin // Defina o plugin import corretamente no formato do Flat config
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before'
            },
            {
              pattern: 'libs/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: './**',
              group: 'sibling',
              position: 'after'
            }
          ],
          'newlines-between': 'always'
        }
      ]
    }
  }
]
