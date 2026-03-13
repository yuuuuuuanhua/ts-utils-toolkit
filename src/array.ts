/**
 * Array utility functions
 */

/**
 * Split an array into chunks of specified size
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) throw new Error('Chunk size must be positive')
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * Get unique values from an array
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * Get unique values by a key function
 */
export function uniqueBy<T>(arr: T[], keyFn: (item: T) => unknown): T[] {
  const seen = new Set()
  return arr.filter((item) => {
    const key = keyFn(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Flatten a nested array to specified depth
 */
export function flatten<T>(arr: unknown[], depth = Infinity): T[] {
  return arr.flat(depth) as T[]
}

/**
 * Group array items by a key function
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce((groups, item) => {
    const key = keyFn(item)
    ;(groups[key] = groups[key] || []).push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Get the last N elements of an array
 */
export function last<T>(arr: T[], n = 1): T | T[] {
  if (n === 1) return arr[arr.length - 1]
  return arr.slice(-n)
}

/**
 * Get the intersection of two arrays
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b)
  return a.filter((item) => setB.has(item))
}

/**
 * Get the difference of two arrays (items in a but not in b)
 */
export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b)
  return a.filter((item) => !setB.has(item))
}

/**
 * Sum numbers in an array
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0)
}

/**
 * Get min/max from array with optional key function
 */
export function minBy<T>(arr: T[], fn: (item: T) => number): T | undefined {
  if (arr.length === 0) return undefined
  return arr.reduce((min, item) => (fn(item) < fn(min) ? item : min))
}

export function maxBy<T>(arr: T[], fn: (item: T) => number): T | undefined {
  if (arr.length === 0) return undefined
  return arr.reduce((max, item) => (fn(item) > fn(max) ? item : max))
}
