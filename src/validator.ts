/**
 * Type guards and validation utilities
 */

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val)
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined
}

export function isNil(val: unknown): val is null | undefined {
  return val == null
}

export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isEmpty(val: unknown): boolean {
  if (val == null) return true
  if (typeof val === 'string' || Array.isArray(val)) return val.length === 0
  if (val instanceof Map || val instanceof Set) return val.size === 0
  if (typeof val === 'object') return Object.keys(val).length === 0
  return false
}

/**
 * Validate a URL string
 */
export function isUrl(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/**
 * Validate a UUID v4 string
 */
export function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str)
}

/**
 * Validate a hex color string
 */
export function isHexColor(str: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(str)
}

/**
 * Check if a number is within a range
 */
export function inRange(num: number, min: number, max: number): boolean {
  return num >= min && num <= max
}
