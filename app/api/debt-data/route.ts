import { NextResponse } from "next/server";

// These values would typically come from authoritative sources
const INITIAL_DEBT = 1236200000000; // $1.2 trillion CAD
const POPULATION = 40100000; // 38 million
const GDP = 2140000000000; // $2 trillion CAD
const ANNUAL_INCREASE = 90000000000; // $90 billion CAD
const DEFAULT_DEBT_INCREASE_PER_SECOND = ANNUAL_INCREASE / (365 * 24 * 60 * 60);

let lastAuthoritativeUpdate = Date.now();
let lastDebt = INITIAL_DEBT;
let lastGDP = GDP;
let lastPopulation = POPULATION;

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

const HISTORY_SIZE = 5;
const SMOOTHING_FACTOR = 0.2;

interface DebtHistory {
  timestamp: number;
  debt: number;
}

const debtHistory: DebtHistory[] = [
  {
    timestamp: lastAuthoritativeUpdate,
    debt: lastDebt,
  },
];

let smoothedDebtIncreasePerSecond = DEFAULT_DEBT_INCREASE_PER_SECOND;

export async function GET() {
  const now = Date.now();

  if (now - lastAuthoritativeUpdate > REFRESH_INTERVAL) {
    // Fetch new data from authoritative sources

    // For now, just simulate new data
    let newDebt =
      lastDebt +
      smoothedDebtIncreasePerSecond * ((now - lastAuthoritativeUpdate) / 1000);
    newDebt += Math.random() * 2000 - 500; // Simulate random fluctuations

    // Calculate new debt increase rate
    const lastRecord = debtHistory[debtHistory.length - 1];
    const timeDiff = (now - lastRecord.timestamp) / 1000;
    const debtDiff = newDebt - lastRecord.debt;
    const newDebtIncreasePerSecond = debtDiff / timeDiff;

    // Smooth out the debt increase rate
    smoothedDebtIncreasePerSecond =
      newDebtIncreasePerSecond * SMOOTHING_FACTOR +
      smoothedDebtIncreasePerSecond * (1 - SMOOTHING_FACTOR);

    // Add new record to history
    debtHistory.push({ timestamp: now, debt: newDebt });
    if (debtHistory.length > HISTORY_SIZE) {
      debtHistory.shift();
    }

    lastDebt = newDebt;
    lastAuthoritativeUpdate = now;

    // Update population and GDP
    lastPopulation = POPULATION;
    lastGDP = GDP;
  }

  const secondsSinceAuthUpdate = Math.floor(
    (now - lastAuthoritativeUpdate) / 1000,
  );

  const currentDebt =
    lastDebt + smoothedDebtIncreasePerSecond * secondsSinceAuthUpdate;

  const debtPerCitizen = currentDebt / lastPopulation;
  const debtToGDPRatio = (currentDebt / lastGDP) * 100;

  const data = {
    nationalDebt: currentDebt,
    debtPerCitizen: debtPerCitizen,
    debtToGDPRatio: debtToGDPRatio,
    population: POPULATION,
    gdp: GDP,
    changes: {
      nationalDebt: 0.01,
      debtToGDPRatio: -0.05,
    },
    lastUpdate: now,
    increaseRate: smoothedDebtIncreasePerSecond,
  };

  return NextResponse.json(data);
}
