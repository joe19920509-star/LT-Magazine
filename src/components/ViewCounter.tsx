'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Record a view
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {});

    // Fetch current count
    fetch(`/api/views/count?slug=${encodeURIComponent(slug)}`)
      .then(res => res.json())
      .then(data => setViews(data.views || 0))
      .catch(() => setViews(0));
  }, [slug]);

  return (
    <span className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      {views !== null ? `${views} 阅读` : '...'}
    </span>
  );
}
