import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isValidLocale } from './shared/i18n/config'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, api routes, and _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/projects') ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a valid locale
  const pathnameSegments = pathname.split('/')
  const firstSegment = pathnameSegments[1]

  if (isValidLocale(firstSegment)) {
    return NextResponse.next()
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const preferredLocale = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().substring(0, 2).toLowerCase())
    .find(lang => isValidLocale(lang)) ?? defaultLocale

  const locale = isValidLocale(preferredLocale) ? preferredLocale : defaultLocale
  return NextResponse.redirect(new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
