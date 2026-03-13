/**
 * Async utility functions
 */

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Retry an async function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; delay?: number; backoff?: number } = {}
): Promise<T> {
  const { maxRetries = 3, delay = 1000, backoff = 2 } = options
  let lastError: Error | undefined

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      if (attempt < maxRetries) {
        await sleep(delay * Math.pow(backoff, attempt))
      }
    }
  }
  throw lastError
}

/**
 * Create a debounced version of a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, wait)
  }
}

/**
 * Create a throttled version of a function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => { inThrottle = false }, limit)
    }
  }
}

/**
 * Run promises in parallel with a concurrency limit
 */
export async function pMap<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency = Infinity
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let index = 0

  const run = async () => {
    while (index < items.length) {
      const i = index++
      results[i] = await fn(items[i], i)
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => run()
  )
  await Promise.all(workers)
  return results
}

/**
 * Create a promise that resolves after a timeout, rejecting if too slow
 */
export function withTimeout<T>(promise: Promise<T>, ms: number, message = 'Operation timed out'): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(message)), ms)
  )
  return Promise.race([promise, timeout])
}
