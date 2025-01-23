"use client";

import { useState, useEffect } from "react";
import { calculateCurrentStats } from "@/utils/calculations";

export default function DebtClock() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState(() => calculateCurrentStats());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setStats(calculateCurrentStats());
    }, 50);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="border rounded-lg p-8 text-lg md:text-xl">
      <h1 className="text-2xl sm:text-3xl font-black mb-8 uppercase font-mono">
        Canadian Debt Clock
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Federal Debt
          </h2>
          <p className="text-red-500 font-mono">
            ${Math.floor(stats.debt).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Debt per Citizen
          </h2>
          <p className="text-red-500 font-mono">
            ${stats.debtPerCitizen.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Debt-to-GDP Ratio 2024
          </h2>
          <p className="text-red-500 font-mono">
            {stats.debtToGDPRatio.toFixed(2)}%
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Debt Increase/Minute
          </h2>
          <p className="text-red-500 font-mono">
            {Math.floor(stats.increaseRate * 60).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Debt Increase/Day
          </h2>
          <p className="text-red-500 font-mono">
            {Math.floor(stats.increaseRate * 86_400).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Federal Debt 2015
          </h2>
          <p className="text-red-500 font-mono">
            {(612300000000).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold text-wrap">
            Largest Deficit 2021
          </h2>
          <p className="text-red-500 font-mono">
            {(327700000000).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Population
          </h2>
          <p className="font-mono">
            {Math.floor(stats.population).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">GDP</h2>
          <p className="text-green-500 font-mono">
            ${Math.floor(stats.gdp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
