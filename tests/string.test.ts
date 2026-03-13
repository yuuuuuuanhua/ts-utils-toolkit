import { describe, it, expect } from 'vitest'
import { camelCase, kebabCase, snakeCase, capitalize, truncate, isEmail, escapeHtml, stripHtml } from '../src/string'

describe('string utilities', () => {
  describe('camelCase', () => {
    it('converts kebab-case', () => expect(camelCase('hello-world')).toBe('helloWorld'))
    it('converts snake_case', () => expect(camelCase('hello_world')).toBe('helloWorld'))
    it('converts space separated', () => expect(camelCase('hello world')).toBe('helloWorld'))
  })

  describe('kebabCase', () => {
    it('converts camelCase', () => expect(kebabCase('helloWorld')).toBe('hello-world'))
    it('converts spaces', () => expect(kebabCase('hello world')).toBe('hello-world'))
  })

  describe('snakeCase', () => {
    it('converts camelCase', () => expect(snakeCase('helloWorld')).toBe('hello_world'))
    it('converts kebab-case', () => expect(snakeCase('hello-world')).toBe('hello_world'))
  })

  describe('capitalize', () => {
    it('capitalizes first letter', () => expect(capitalize('hello')).toBe('Hello'))
    it('handles empty string', () => expect(capitalize('')).toBe(''))
  })

  describe('truncate', () => {
    it('truncates long strings', () => expect(truncate('hello world foo', 10)).toBe('hello w...'))
    it('keeps short strings', () => expect(truncate('hello', 10)).toBe('hello'))
  })

  describe('isEmail', () => {
    it('validates correct email', () => expect(isEmail('test@example.com')).toBe(true))
    it('rejects invalid email', () => expect(isEmail('not-an-email')).toBe(false))
  })

  describe('escapeHtml', () => {
    it('escapes special chars', () => expect(escapeHtml('<div>"hi"</div>')).toBe('&lt;div&gt;&quot;hi&quot;&lt;/div&gt;'))
  })

  describe('stripHtml', () => {
    it('removes html tags', () => expect(stripHtml('<p>hello <b>world</b></p>')).toBe('hello world'))
  })
})
