# ts-utils-toolkit

A collection of practical TypeScript utility functions for everyday development.

## Features

- 🔧 String utilities (camelCase, kebabCase, truncate, etc.)
- 📦 Array utilities (chunk, unique, flatten, groupBy, etc.)
- 🎯 Object utilities (pick, omit, deepClone, merge, etc.)
- ⏱️ Async utilities (retry, debounce, throttle, sleep, etc.)
- 🔍 Type guards and validators
- 📅 Date formatting helpers

## Installation

```bash
npm install ts-utils-toolkit
```

## Usage

```typescript
import { chunk, debounce, deepClone } from 'ts-utils-toolkit'

const chunks = chunk([1, 2, 3, 4, 5], 2) // [[1,2], [3,4], [5]]
```

## License

MIT
