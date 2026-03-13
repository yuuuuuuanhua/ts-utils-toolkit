import { describe, it, expect } from 'vitest'
import { formatDate, timeAgo, isToday, addDays, diffInDays, isLeapYear } from '../src/date'

describe('date utilities', () => {
  describe('formatDate', () => {
    it('formats YYYY-MM-DD', () => {
      const date = new Date('2024-03-15T10:30:00')
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-03-15')
    })
    it('formats with time', () => {
      const date = new Date('2024-03-15T10:30:45')
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 10:30:45')
    })
  })

  describe('timeAgo', () => {
    it('returns just now for recent dates', () => {
      const now = new Date()
      expect(timeAgo(now, now)).toBe('just now')
    })
    it('returns minutes ago', () => {
      const now = new Date()
      const past = new Date(now.getTime() - 5 * 60 * 1000)
      expect(timeAgo(past, now)).toBe('5 minutes ago')
    })
    it('returns hours ago', () => {
      const now = new Date()
      const past = new Date(now.getTime() - 3 * 3600 * 1000)
      expect(timeAgo(past, now)).toBe('3 hours ago')
    })
  })

  describe('isToday', () => {
    it('returns true for today', () => expect(isToday(new Date())).toBe(true))
    it('returns false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isToday(yesterday)).toBe(false)
    })
  })

  describe('addDays', () => {
    it('adds days correctly', () => {
      const date = new Date('2024-03-15')
      expect(addDays(date, 5).getDate()).toBe(20)
    })
  })

  describe('diffInDays', () => {
    it('calculates difference', () => {
      const a = new Date('2024-03-20')
      const b = new Date('2024-03-15')
      expect(diffInDays(a, b)).toBe(5)
    })
  })

  describe('isLeapYear', () => {
    it('2024 is a leap year', () => expect(isLeapYear(2024)).toBe(true))
    it('2023 is not a leap year', () => expect(isLeapYear(2023)).toBe(false))
    it('2000 is a leap year', () => expect(isLeapYear(2000)).toBe(true))
    it('1900 is not a leap year', () => expect(isLeapYear(1900)).toBe(false))
  })
})
