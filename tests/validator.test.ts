import { describe, it, expect } from 'vitest'
import { isString, isNumber, isNil, isEmpty, isUrl, isUUID, isHexColor, inRange } from '../src/validator'

describe('validator utilities', () => {
  describe('isString', () => {
    it('returns true for strings', () => expect(isString('hello')).toBe(true))
    it('returns false for numbers', () => expect(isString(42)).toBe(false))
  })

  describe('isNumber', () => {
    it('returns true for numbers', () => expect(isNumber(42)).toBe(true))
    it('returns false for NaN', () => expect(isNumber(NaN)).toBe(false))
    it('returns false for strings', () => expect(isNumber('42')).toBe(false))
  })

  describe('isNil', () => {
    it('returns true for null', () => expect(isNil(null)).toBe(true))
    it('returns true for undefined', () => expect(isNil(undefined)).toBe(true))
    it('returns false for 0', () => expect(isNil(0)).toBe(false))
  })

  describe('isEmpty', () => {
    it('empty string is empty', () => expect(isEmpty('')).toBe(true))
    it('empty array is empty', () => expect(isEmpty([])).toBe(true))
    it('empty object is empty', () => expect(isEmpty({})).toBe(true))
    it('null is empty', () => expect(isEmpty(null)).toBe(true))
    it('non-empty string is not empty', () => expect(isEmpty('hi')).toBe(false))
  })

  describe('isUrl', () => {
    it('validates https url', () => expect(isUrl('https://example.com')).toBe(true))
    it('rejects plain string', () => expect(isUrl('not a url')).toBe(false))
  })

  describe('isUUID', () => {
    it('validates UUID v4', () => expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true))
    it('rejects invalid', () => expect(isUUID('not-a-uuid')).toBe(false))
  })

  describe('isHexColor', () => {
    it('validates 6-digit hex', () => expect(isHexColor('#ff0000')).toBe(true))
    it('validates 3-digit hex', () => expect(isHexColor('#f00')).toBe(true))
    it('rejects invalid', () => expect(isHexColor('red')).toBe(false))
  })

  describe('inRange', () => {
    it('returns true when in range', () => expect(inRange(5, 1, 10)).toBe(true))
    it('returns false when out of range', () => expect(inRange(15, 1, 10)).toBe(false))
    it('includes boundaries', () => expect(inRange(10, 1, 10)).toBe(true))
  })
})
