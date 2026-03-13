import { describe, it, expect } from 'vitest'
import { pick, omit, deepClone, deepMerge, get, set, isPlainObject } from '../src/object'

describe('object utilities', () => {
  describe('pick', () => {
    it('picks specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })
  })

  describe('omit', () => {
    it('omits specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
    })
  })

  describe('deepClone', () => {
    it('clones nested objects', () => {
      const obj = { a: { b: { c: 1 } }, d: [1, 2] }
      const cloned = deepClone(obj)
      cloned.a.b.c = 99
      expect(obj.a.b.c).toBe(1)
    })
    it('clones dates', () => {
      const date = new Date('2024-01-01')
      const cloned = deepClone(date)
      expect(cloned.getTime()).toBe(date.getTime())
    })
  })

  describe('deepMerge', () => {
    it('merges nested objects', () => {
      const a = { x: { y: 1, z: 2 }, w: 3 }
      const b = { x: { y: 10 } }
      expect(deepMerge(a, b)).toEqual({ x: { y: 10, z: 2 }, w: 3 })
    })
  })

  describe('get', () => {
    it('gets nested value', () => {
      const obj = { a: { b: { c: 42 } } }
      expect(get(obj, 'a.b.c')).toBe(42)
    })
    it('returns default for missing path', () => {
      expect(get({}, 'a.b.c', 'default')).toBe('default')
    })
  })

  describe('set', () => {
    it('sets nested value', () => {
      const obj: Record<string, unknown> = {}
      set(obj, 'a.b.c', 42)
      expect((obj.a as any).b.c).toBe(42)
    })
  })

  describe('isPlainObject', () => {
    it('returns true for plain objects', () => expect(isPlainObject({})).toBe(true))
    it('returns false for arrays', () => expect(isPlainObject([])).toBe(false))
    it('returns false for null', () => expect(isPlainObject(null)).toBe(false))
  })
})
