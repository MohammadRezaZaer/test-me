import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FIELDS } from '@/schema/schemas';
import { ROUTES } from '@/lib/constants';

export function middleware(req: NextRequest) {
  const mobile = req.cookies.get(FIELDS.AUTH_TOKEN);

  if (req.nextUrl.pathname.startsWith(ROUTES.DASHBOARD.default) && !mobile) {
    return NextResponse.redirect(new URL(ROUTES.AUTH, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ROUTES.DASHBOARD.default+'/:path*'],
};
