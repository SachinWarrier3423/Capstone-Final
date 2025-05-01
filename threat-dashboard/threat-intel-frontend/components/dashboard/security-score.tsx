"use client"

import { useEffect, useState } from "react";

export function SecurityScore() {
  const [score, setScore] = useState(100);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((alerts) => {
        const base = 100;
        const penalty = alerts.length * 5;
        setScore(Math.max(base - penalty, 10));
      });
  }, []);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <h3 className="text-lg font-medium mb-2">Security Score</h3>
      <p className="text-3xl font-bold text-green-500">{score}%</p>
    </div>
  );
}
