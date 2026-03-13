import { describe, it, expect } from 'vitest'
import { clamp, randomInt, round, formatNumber, formatBytes, percentage, lerp } from '../src/number'

describe('number utilities', () => {
  describe('clamp', () => {
    it('clamps below min', () => expect(clamp(-5, 0, 10)).toBe(0))
    it('clamps above max', () => expect(clamp(15, 0, 10)).toBe(10))
    it('returns value in range', () => expect(clamp(5, 0, 10)).toBe(5))
  })

  describe('randomInt', () => {
    it('generates within range', () => {
      for (let i = 0; i < 100; i++) {
        const val = randomInt(1, 10)
        expect(val).toBeGreaterThanOrEqual(1)
        expect(val).toBeLessThanOrEqual(10)
        expect(Number.isInteger(val)).toBe(true)
      }
    })
  })

  describe('round', () => {
    it('rounds to 2 decimals', () => expect(round(3.14159, 2)).toBe(3.14))
    it('rounds to integer', () => expect(round(3.7)).toBe(4))
  })

  describe('formatBytes', () => {
    it('formats bytes', () => expect(formatBytes(0)).toBe('0 Bytes'))
    it('formats KB', () => expect(formatBytes(1024)).toBe('1 KB'))
    it('formats MB', () => expect(formatBytes(1048576)).toBe('1 MB'))
    it('formats GB', () => expect(formatBytes(1073741824)).toBe('1 GB'))
  })

  describe('percentage', () => {
    it('calculates percentage', () => expect(percentage(25, 100)).toBe(25))
    it('handles zero total', () => expect(percentage(5, 0)).toBe(0))
  })

  describe('lerp', () => {
    it('interpolates at 0', () => expect(lerp(0, 10, 0)).toBe(0))
    it('interpolates at 1', () => expect(lerp(0, 10, 1)).toBe(10))
    it('interpolates at 0.5', () => expect(lerp(0, 10, 0.5)).toBe(5))
  })
})
