import { describe, it, expect, vi } from 'vitest'
import { sleep, retry, withTimeout } from '../src/async'

describe('async utilities', () => {
  describe('sleep', () => {
    it('resolves after delay', async () => {
      const start = Date.now()
      await sleep(100)
      expect(Date.now() - start).toBeGreaterThanOrEqual(90)
    })
  })

  describe('retry', () => {
    it('succeeds on first try', async () => {
      const fn = vi.fn().mockResolvedValue('ok')
      const result = await retry(fn, { maxRetries: 3, delay: 10 })
      expect(result).toBe('ok')
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('retries on failure then succeeds', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('ok')
      const result = await retry(fn, { maxRetries: 3, delay: 10 })
      expect(result).toBe('ok')
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('throws after max retries', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('always fails'))
      await expect(retry(fn, { maxRetries: 2, delay: 10 })).rejects.toThrow('always fails')
      expect(fn).toHaveBeenCalledTimes(3)
    })
  })

  describe('withTimeout', () => {
    it('resolves if promise is fast enough', async () => {
      const result = await withTimeout(Promise.resolve('fast'), 1000)
      expect(result).toBe('fast')
    })

    it('rejects if promise is too slow', async () => {
      const slow = new Promise((resolve) => setTimeout(resolve, 5000))
      await expect(withTimeout(slow, 50)).rejects.toThrow('timed out')
    })
  })
})
