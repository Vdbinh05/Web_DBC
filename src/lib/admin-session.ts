import 'server-only';

import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'tn_admin_session';
const SESSION_SECONDS = 8 * 60 * 60;

function adminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  return password && password.length >= 32 ? password : null;
}

export function adminConfigured() {
  return adminPassword() !== null;
}

function equal(a: string, b: string) {
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}

function signature(password: string, expires: string) {
  return createHmac('sha256', password).update(`tn-admin-v1:${expires}`).digest('base64url');
}

export async function adminAuthenticated() {
  const password = adminPassword();
  const session = (await cookies()).get(COOKIE_NAME)?.value;
  if (!password || !session || !/^\d{10}\.[\w-]{43}$/.test(session)) return false;
  const [expires, token] = session.split('.');
  const remaining = Number(expires) - Math.floor(Date.now() / 1000);
  return remaining > 0 && remaining <= SESSION_SECONDS && equal(token, signature(password, expires));
}

export async function startAdminSession(value: unknown) {
  const password = adminPassword();
  if (!password || typeof value !== 'string' || value.length > 256 || !equal(password, value)) return false;
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  (await cookies()).set(COOKIE_NAME, `${expires}.${signature(password, expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/admin',
    maxAge: SESSION_SECONDS,
  });
  return true;
}

export async function endAdminSession() {
  (await cookies()).set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/admin',
    maxAge: 0,
  });
}
