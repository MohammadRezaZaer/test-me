// lib/auth.ts
import { FIELDS } from '@/schema/schemas';
import { cookies } from 'next/headers';



export function logoutUser() {
  cookies().delete(FIELDS.AUTH_TOKEN);
}




export function isAuthenticated(): boolean {
  const token = cookies().get(FIELDS.AUTH_TOKEN)?.value;
  return !!token;
}

export function setLoginCookie(phone: string) {
  cookies().set(FIELDS.AUTH_TOKEN, phone, { httpOnly: true });
}


