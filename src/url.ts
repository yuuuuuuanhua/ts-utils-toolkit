/**
 * URL utility functions
 */

/**
 * Parse query string into object
 */
export function parseQuery(query: string): Record<string, string> {
  if (query.startsWith('?')) query = query.slice(1)
  if (!query) return {}

  return query.split('&').reduce((params, param) => {
    const [key, value] = param.split('=').map(decodeURIComponent)
    params[key] = value ?? ''
    return params
  }, {} as Record<string, string>)
}

/**
 * Build query string from object
 */
export function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const entries = Object.entries(params)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
  return entries.length ? '?' + entries.join('&') : ''
}

/**
 * Join URL path segments safely
 */
export function joinUrl(...parts: string[]): string {
  return parts
    .map((part, i) => {
      if (i === 0) return part.replace(/\/+$/, '')
      if (i === parts.length - 1) return part.replace(/^\/+/, '')
      return part.replace(/^\/+|\/+$/g, '')
    })
    .filter(Boolean)
    .join('/')
}

/**
 * Get the file extension from a URL or path
 */
export function getExtension(url: string): string {
  const pathname = url.split('?')[0].split('#')[0]
  const lastDot = pathname.lastIndexOf('.')
  if (lastDot === -1) return ''
  return pathname.slice(lastDot + 1).toLowerCase()
}

/**
 * Check if a URL is absolute
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}
