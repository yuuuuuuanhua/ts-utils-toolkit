import { describe, it, expect } from 'vitest'
import { chunk, unique, uniqueBy, groupBy, shuffle, intersection, difference, sum, flatten } from '../src/array'

describe('array utilities', () => {
  describe('chunk', () => {
    it('splits array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })
    it('handles exact division', () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
    })
    it('throws on non-positive size', () => {
      expect(() => chunk([1], 0)).toThrow()
    })
  })

  describe('unique', () => {
    it('removes duplicates', () => expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]))
    it('handles strings', () => expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']))
  })

  describe('uniqueBy', () => {
    it('removes duplicates by key', () => {
      const items = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }]
      expect(uniqueBy(items, (i) => i.id)).toEqual([{ id: 1, name: 'a' }, { id: 2, name: 'b' }])
    })
  })

  describe('groupBy', () => {
    it('groups by key function', () => {
      const items = [{ type: 'a', val: 1 }, { type: 'b', val: 2 }, { type: 'a', val: 3 }]
      const result = groupBy(items, (i) => i.type)
      expect(result.a).toHaveLength(2)
      expect(result.b).toHaveLength(1)
    })
  })

  describe('shuffle', () => {
    it('returns same length array', () => {
      const arr = [1, 2, 3, 4, 5]
      expect(shuffle(arr)).toHaveLength(5)
    })
    it('does not modify original', () => {
      const arr = [1, 2, 3]
      shuffle(arr)
      expect(arr).toEqual([1, 2, 3])
    })
  })

  describe('intersection', () => {
    it('finds common elements', () => expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]))
  })

  describe('difference', () => {
    it('finds different elements', () => expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]))
  })

  describe('sum', () => {
    it('sums numbers', () => expect(sum([1, 2, 3, 4])).toBe(10))
    it('handles empty array', () => expect(sum([])).toBe(0))
  })
})
