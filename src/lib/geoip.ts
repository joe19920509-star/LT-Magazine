/**
 * IP Geolocation API
 * Uses ip-api.com (free, 45 requests/minute limit)
 * Returns: { country, province, city, ip }
 */

/** Free tier is HTTP-only (see ip-api.com docs); server-side fetch on Vercel supports this. */
const IP_API_URL = 'http://ip-api.com/json'

export interface GeoLocation {
  country: string
  province: string
  city: string
  ip: string
}

/**
 * Get geolocation data from client IP
 * @param ip - Client IP address (if not provided, uses request IP)
 * @returns Location data or null on failure
 */
export async function getGeoLocation(ip?: string): Promise<GeoLocation | null> {
  try {
    // If no IP provided, try to get from a free endpoint
    // Note: In production, you'd typically use request headers or a proxy
    const targetIp = (ip || '').trim()
    // ip-api: omit path segment to query caller IP (on serverless this is the platform egress IP, not the visitor)
    const path = targetIp && !/^127\.|^10\.|^192\.168\.|^172\.(1[6-9]|2\d|3[01])\./.test(targetIp)
      ? `/${encodeURIComponent(targetIp)}`
      : ''

    const response = await fetch(`${IP_API_URL}${path}?lang=zh`, {
      next: { revalidate: 0 } // Don't cache
    })
    
    if (!response.ok) {
      console.error('GeoIP API error:', response.status)
      return null
    }
    
    const data = await response.json()
    
    if (data.status !== 'success') {
      console.error('GeoIP lookup failed:', data.message)
      return null
    }
    
    return {
      country: data.country || '',
      province: data.regionName || '', // province in China
      city: data.city || '',
      ip: data.query || ip || ''
    }
  } catch (error) {
    console.error('GeoIP error:', error)
    return null
  }
}

/**
 * Get country flag emoji
 */
export function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

/**
 * Format location for display
 */
export function formatLocation(geo: GeoLocation | null): string {
  if (!geo || !geo.country) return '未知'
  
  const flag = getCountryFlag(geo.country)
  return `${flag} ${geo.province || geo.country} ${geo.city || ''}`.trim()
}

/**
 * Parse birth date to age
 */
export function calculateAge(birthDate: string | null): number | null {
  if (!birthDate) return null
  
  const birth = new Date(birthDate)
  const today = new Date()
  
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age >= 0 && age < 150 ? age : null
}

/**
 * Group age into ranges for analytics
 */
export function groupAgeRange(age: number | null): string {
  if (age === null) return '未知'
  if (age < 18) return '18岁以下'
  if (age < 25) return '18-24岁'
  if (age < 35) return '25-34岁'
  if (age < 45) return '35-44岁'
  if (age < 55) return '45-54岁'
  if (age < 65) return '55-64岁'
  return '65岁及以上'
}