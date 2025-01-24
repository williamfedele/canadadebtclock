import { FiscalEntry } from "@/utils/types";

export const REFERENCE_TIME = Date.now();

// Taken from annual fiscal reports
const FISCAL_ENTRIES: FiscalEntry[] = [
  {
    debt: BigInt(1_048_746_000_000),
    revenue: BigInt(316_446 * 1_000_000),
    deptToGPDRatio: 47.6,
    fiscalYearEnd: new Date("31 Mar 2021"),
  },
  {
    debt: BigInt(1_139_975_000_000),
    revenue: BigInt(413_277 * 1_000_000),
    deptToGPDRatio: 45.5,
    fiscalYearEnd: new Date("31 Mar 2022"),
  },
  {
    debt: BigInt(1_173_013_000_000),
    revenue: BigInt(447_815 * 1_000_000),
    deptToGPDRatio: 42.2,
    fiscalYearEnd: new Date("31 Mar 2023"),
  },
  {
    debt: BigInt(1_236_151_000_000),
    revenue: BigInt(459_549 * 1_000_000),
    deptToGPDRatio: 42.1,
    fiscalYearEnd: new Date("31 Mar 2024"),
  },
];

// Used to calculate the catch-up increases
const LAST_FISCAL_DATE =
  FISCAL_ENTRIES[FISCAL_ENTRIES.length - 1].fiscalYearEnd.getTime();
export const LAST_GDP_RATIO =
  FISCAL_ENTRIES[FISCAL_ENTRIES.length - 1].deptToGPDRatio / 100;
export const LAST_FEDERAL_DEBT = Number(
  FISCAL_ENTRIES[FISCAL_ENTRIES.length - 1].debt,
);
const CATCH_UP_SECONDS = (REFERENCE_TIME - LAST_FISCAL_DATE) / 1000;

// DEBT
const calculateDebtChangePerSecond = (fiscalEntries: FiscalEntry[]): number => {
  const firstEntry = fiscalEntries[0];
  const lastEntry = fiscalEntries[fiscalEntries.length - 1];

  // Get time difference in seconds
  const timeDiffSeconds =
    (lastEntry.fiscalYearEnd.getTime() - firstEntry.fiscalYearEnd.getTime()) /
    1000;

  // Calculate debt difference maintaining BigInt precision
  const debtDiff = lastEntry.debt - firstEntry.debt;

  // Convert to per second rate at the last possible moment
  return Number(debtDiff) / timeDiffSeconds;
};

export const LAST_DEFICIT =
  Number(FISCAL_ENTRIES[FISCAL_ENTRIES.length - 1].debt) -
  Number(FISCAL_ENTRIES[FISCAL_ENTRIES.length - 2].debt);

export const DEBT_INCREASE_PER_SECOND =
  calculateDebtChangePerSecond(FISCAL_ENTRIES);

// Calculate initial catch-up from last fiscal to server start
export const BASE_DEBT =
  Number(FISCAL_ENTRIES[FISCAL_ENTRIES.length - 1].debt) +
  DEBT_INCREASE_PER_SECOND * CATCH_UP_SECONDS;

// REVENUE
const calculateRevenueChangePerSecond = (
  fiscalEntries: FiscalEntry[],
): number => {
  const firstEntry = fiscalEntries[0];
  const lastEntry = fiscalEntries[fiscalEntries.length - 1];

  // Get time difference in seconds
  const timeDiffSeconds =
    (lastEntry.fiscalYearEnd.getTime() - firstEntry.fiscalYearEnd.getTime()) /
    1000;

  // Calculate revenue difference maintaining BigInt precision
  const revenueDiff = lastEntry.revenue - firstEntry.revenue;

  // Convert to per second rate at the last possible moment
  return Number(revenueDiff) / timeDiffSeconds;
};

export const REVENUE_INCREASE_PER_SECOND =
  calculateRevenueChangePerSecond(FISCAL_ENTRIES);

export const BASE_REVENUE =
  Number(FISCAL_ENTRIES[FISCAL_ENTRIES.length - 1].revenue) +
  REVENUE_INCREASE_PER_SECOND * CATCH_UP_SECONDS;

// GDP
export const BASE_GDP =
  BASE_DEBT / (FISCAL_ENTRIES[FISCAL_ENTRIES.length - 1].deptToGPDRatio / 100);

// POPULATION
// https://www150.statcan.gc.ca/n1/pub/71-607-x/71-607-x2018005-eng.htm
export const BASE_POPULATION = 41_590_457;
export const LAST_POPULATION_UPDATE = Date.parse("23 Jan 2025 15:28:00 EST");
const MIDNIGHT = Date.parse("23 Jan 2025 00:00:00 EST");
const _SECONDS_SINCE_MIDNIGHT = (LAST_POPULATION_UPDATE - MIDNIGHT) / 1000;
const _POPULATION_CHANGE_SINCE_MIDNIGHT = 764;
export const POPULATION_INCREASE_PER_SECOND =
  _POPULATION_CHANGE_SINCE_MIDNIGHT / _SECONDS_SINCE_MIDNIGHT;
