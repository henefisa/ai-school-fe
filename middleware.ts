import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes('null') || pathname.includes('undefined')) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.next();
}
