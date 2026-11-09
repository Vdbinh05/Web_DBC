'use server';

import { redirect } from 'next/navigation';
import { adminAuthenticated, adminPath, endAdminSession, startAdminSession } from '@/lib/admin-session';
import { isOrderStatus, ORDER_ID_PATTERN, OrderStorageError, updateOrderStatus } from '@/lib/order-storage';

export async function login(form: FormData) {
  const path = await adminPath();
  if (!(await startAdminSession(form.get('password')))) redirect(`${path}?notice=login`);
  redirect(path);
}

export async function logout() {
  await endAdminSession();
  redirect(await adminPath());
}

export async function changeStatus(form: FormData) {
  const path = await adminPath();
  if (!(await adminAuthenticated())) redirect(path);
  const id = form.get('orderId');
  const status = form.get('status');
  const previousStatus = form.get('previousStatus');
  const before = Number(form.get('before'));
  const page = Number.isSafeInteger(before) && before >= 3 ? `&before=${before}` : '';

  if (typeof id !== 'string' || !ORDER_ID_PATTERN.test(id) || !isOrderStatus(status) || !isOrderStatus(previousStatus)) {
    redirect(`${path}?notice=invalid${page}`);
  }

  let notice = 'saved';
  try {
    await updateOrderStatus(id, status, previousStatus);
  } catch (error) {
    notice = error instanceof OrderStorageError && error.code === 'conflict' ? 'conflict' : 'unavailable';
  }
  redirect(`${path}?notice=${notice}${page}#${id}`);
}
