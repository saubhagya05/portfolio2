'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Analytics is opt-in. Without a real Supabase project these requests just hang
// on DNS and stall the page, so they stay off unless you explicitly enable them
// by setting NEXT_PUBLIC_ENABLE_ANALYTICS=true in .env.local.
const ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

export default function TrackVisit() {
  const pathname = usePathname();

  useEffect(() => {
    if (!ENABLED) return;
    if (pathname?.startsWith('/admin')) return;

    const source = new URLSearchParams(window.location.search).get('source') || '';

    fetch('/api/analytics/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname, referrer: document.referrer || '', source }),
    }).catch(() => {});

    // Track search query from URL params (utm_term, q, search, etc.)
    const params = new URLSearchParams(window.location.search);
    const query =
      params.get('utm_term') || params.get('q') || params.get('query') || params.get('search');
    if (query && query.trim().length >= 2) {
      fetch('/api/analytics/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      }).catch(() => {});
    }

    // Live users ping
    if (!window.sessionTrackingId) {
      window.sessionTrackingId = crypto.randomUUID();
    }

    const ping = () => {
      fetch('/api/analytics/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: window.sessionTrackingId, page: pathname }),
        keepalive: true,
      }).catch(() => {});
    };

    ping();
    const interval = setInterval(ping, 30000);

    const cleanup = () => {
      fetch('/api/analytics/ping-leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: window.sessionTrackingId }),
        keepalive: true,
      }).catch(() => {});
    };

    window.addEventListener('beforeunload', cleanup);
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [pathname]);

  return null;
}
