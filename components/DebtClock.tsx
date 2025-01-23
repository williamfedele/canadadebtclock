"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";

interface DebtData {
  nationalDebt: number;
  debtPerCitizen: number;
  debtToGDPRatio: number;
  population: number;
  gdp: number;
  lastUpdate: number;
  increaseRate: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CanadianDebtClock() {
  const { data, error } = useSWR<DebtData>("/api/debt-data", fetcher, {
    refreshInterval: 2.5 * 60 * 1000, // 2.5 minutes
    keepPreviousData: true,
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDebt, setCurrentDebt] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    if (!data) return;

    const updateDebt = () => {
      const now = Date.now();
      const msSinceUpdate = now - data.lastUpdate;
      const increase = (data.increaseRate / 1000) * msSinceUpdate;
      setCurrentDebt(data.nationalDebt + increase);
    };
    const debtTimer = setInterval(updateDebt, 50);
    updateDebt();

    return () => {
      clearInterval(timer);
      clearInterval(debtTimer);
    };
  }, [data]);

  if (error) return <div>Failed to load debt data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="border border-dotted rounded-none p-8 text-lg">
      <h1 className="text-2xl sm:text-3xl font-black mb-8 tracking-wider">
        Canadian Debt Clock
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-sm uppercase tracking-widest">National Debt</h2>
          <p className="text-red-500 font-extrabold">
            {Math.floor(currentDebt).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest">
            Debt per Citizen
          </h2>
          <p className="text-red-500 font-extrabold">
            ${data.debtPerCitizen.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest">
            Debt to GDP Ratio
          </h2>
          <p className="text-red-500 font-extrabold">
            {data.debtToGDPRatio.toFixed(2)}%
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest">
            Daily Debt Increase
          </h2>
          <p className="text-red-500 font-extrabold">
            {Math.floor(data.increaseRate * 3600 * 24).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest">
            National Debt 2015
          </h2>
          <p className="text-red-500 font-extrabold">
            {(612300000000).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest">
            Largest Deficit (2021)
          </h2>
          <p className="text-red-500 font-extrabold">
            {(327700000000).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest">Population</h2>
          <p className="font-extrabold">{data.population.toLocaleString()}</p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest">GDP</h2>
          <p className="text-green-500 font-extrabold">
            ${data.gdp.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest">Current Time</h2>
          <p className="font-extrabold">
            {currentTime.toLocaleString("en-GB", { hour12: false })}
          </p>
        </div>
      </div>
    </div>
  );
}
