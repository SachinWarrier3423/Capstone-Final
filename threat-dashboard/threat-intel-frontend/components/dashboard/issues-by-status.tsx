"use client"

import { useEffect, useState } from "react";

export function IssuesByStatus() {
  const [counts, setCounts] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((alerts: { severity: 'high' | 'medium' | 'low' }[]) => {
        const result: Record<'high' | 'medium' | 'low', number> = { high: 0, medium: 0, low: 0 };
        alerts.forEach((alert) => {
          if (alert.severity in result) result[alert.severity]++;
        });
        setCounts(result);
      });
  }, []);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <h3 className="text-lg font-medium mb-2">Issues by Status</h3>
      <ul className="text-sm space-y-1">
        <li>High: {counts.high}</li>
        <li>Medium: {counts.medium}</li>
        <li>Low: {counts.low}</li>
      </ul>
    </div>
  );
}

