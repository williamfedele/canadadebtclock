"use client";

import { useState, useEffect } from "react";
import { calculateCurrentStats } from "@/utils/calculations";

export default function DebtClock() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState(() => calculateCurrentStats());

  useEffect(() => {
    setMounted(true);

    let animationFrameId: number;

    const updateStats = () => {
      setStats(calculateCurrentStats());
      animationFrameId = requestAnimationFrame(updateStats);
    };

    animationFrameId = requestAnimationFrame(updateStats);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="border rounded-lg p-4 lg:p-8 text-lg lg:text-xl">
      <h1 className="text-2xl sm:text-2xl font-black mb-4 lg:mb-8 uppercase font-mono">
        Canadian Debt Clock
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1 lg:gap-y-4 gap-x-8 lg:gap-x-16">
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
            Debt this Year
          </h2>
          <p className="text-red-500 font-mono">
            ${Math.floor(stats.debtThisYear).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Debt Delta
          </h2>
          <p
            className={`font-mono ${stats.debtDelta < 0 ? "text-green-500" : "text-red-500"}`}
          >
            ${Math.floor(stats.debtDelta).toLocaleString()}
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
            {Math.floor(stats.debtIncreaseRate * 60).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Debt Increase/Day
          </h2>
          <p className="text-red-500 font-mono">
            {Math.floor(stats.debtIncreaseRate * 86_400).toLocaleString()}
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
          <h2 className="text-sm uppercase tracking-widest font-bold">GDP</h2>
          <p className="text-green-500 font-mono">
            ${Math.floor(stats.gdp).toLocaleString()}
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
          <h2 className="text-sm uppercase tracking-widest font-bold">
            Pop Growth/Day
          </h2>
          <p className="font-mono">
            {Math.floor(stats.populationIncreaseRate * 86400).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
