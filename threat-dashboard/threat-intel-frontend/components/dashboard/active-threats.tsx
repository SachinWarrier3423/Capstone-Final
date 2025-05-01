"use client"

import { useEffect, useState } from "react";

export function ActiveThreats() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => setData(res.reverse()))
      .catch((err) => console.error("Error fetching alerts:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <h3 className="text-lg font-medium mb-2">Active Threats</h3>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted">No threats found.</p>
      ) : (
        <ul className="text-sm space-y-2">
          {data.slice(0, 5).map((alert, idx) => (
            <li key={idx} className="text-destructive">
              {alert.type.toUpperCase()} - {alert.ip} - {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
