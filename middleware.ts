import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { searchParams } = request.nextUrl;

  // Capture UTM parameters
  const utmParams = {
    utm_source: searchParams.get('utm_source'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
    utm_content: searchParams.get('utm_content'),
    utm_term: searchParams.get('utm_term'),
  };

  // Store UTM params in cookies for form submission passthrough
  // Only set if at least one UTM param is present
  const hasUtm = Object.values(utmParams).some(Boolean);
  
  if (hasUtm) {
    // Filter out null values and serialize
    const filteredUtm = Object.fromEntries(
      Object.entries(utmParams).filter(([, v]) => v !== null)
    );
    
    response.cookies.set('utm_params', JSON.stringify(filteredUtm), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  // Get geo information from Vercel headers (available on Vercel Edge)
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';
  
  // Store geo in cookie for form submission
  response.cookies.set('ip_country', country, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
