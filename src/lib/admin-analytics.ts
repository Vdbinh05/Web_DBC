import 'server-only';

import { JWT } from 'google-auth-library';

const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const TOTAL_METRICS = ['activeUsers', 'sessions', 'screenPageViews'];
const REQUEST_TIMEOUT = 5000;

export type TrafficPeriod = 7 | 30;
export type TrafficRank = { label: string; count: number };

type Report = {
  rows?: {
    dimensionValues?: { value?: string }[];
    metricValues?: { value?: string }[];
  }[];
};

function readConfig() {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const json = process.env.GA4_SERVICE_ACCOUNT_JSON;
  if (!/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID ?? '') || !propertyId || !json) return null;
  const account = JSON.parse(json);
  if (!/^\d+$/.test(propertyId) || account?.type !== 'service_account' ||
    typeof account.client_email !== 'string' || typeof account.private_key !== 'string') {
    throw new Error('Invalid GA4 service account configuration');
  }
  return { propertyId, email: account.client_email, key: account.private_key };
}

function metric(value: string | undefined) {
  const number = Number(value ?? 0);
  if (!Number.isSafeInteger(number) || number < 0) throw new Error('Invalid GA4 metric');
  return number;
}

function rankings(report: Report): TrafficRank[] {
  return (report.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[0]?.value || '(not set)',
    count: metric(row.metricValues?.[0]?.value),
  }));
}

export async function getAdminTraffic(days: TrafficPeriod) {
  const config = readConfig();
  if (!config) return null;
  const { propertyId, email, key } = config;

  const auth = new JWT({
    email,
    key,
    scopes: [SCOPE],
    transporterOptions: { timeout: REQUEST_TIMEOUT },
  });
  const { token } = await auth.getAccessToken();
  if (!token) throw new Error('GA4 access token unavailable');

  async function request<T>(method: 'batchRunReports' | 'runRealtimeReport', body: object): Promise<T> {
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:${method}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      },
    );
    if (!response.ok) throw new Error(`GA4 ${method} failed (${response.status})`);
    return response.json();
  }

  const dateRanges = [{ startDate: `${days - 1}daysAgo`, endDate: 'today' }];
  function rankedReport(dimension: string, metricName: string) {
    return {
      dateRanges,
      dimensions: [{ name: dimension }],
      metrics: [{ name: metricName }],
      orderBys: [{ metric: { metricName }, desc: true }],
      limit: '8',
    };
  }

  const [batch, activeNow] = await Promise.all([
    request<{ reports: Report[] }>('batchRunReports', {
      requests: [
        { dateRanges, metrics: TOTAL_METRICS.map((name) => ({ name })) },
        rankedReport('sessionDefaultChannelGroup', 'sessions'),
        rankedReport('pagePath', 'screenPageViews'),
      ],
    }),
    request<Report>('runRealtimeReport', { metrics: [{ name: 'activeUsers' }] })
      .then((report) => metric(report.rows?.[0]?.metricValues?.[0]?.value))
      .catch(() => null),
  ]);

  const [totals, sources, pages] = batch.reports;
  if (!totals || !sources || !pages) throw new Error('Incomplete GA4 batch report');
  const values = totals.rows?.[0]?.metricValues;
  return {
    activeUsers: metric(values?.[0]?.value),
    sessions: metric(values?.[1]?.value),
    views: metric(values?.[2]?.value),
    activeNow,
    sources: rankings(sources),
    pages: rankings(pages),
  };
}
