import {
  REFERENCE_TIME,
  BASE_DEBT,
  LAST_FEDERAL_DEBT,
  LAST_DEFICIT,
  DEBT_INCREASE_PER_SECOND,
  BASE_GDP,
  LAST_GDP_RATIO,
  BASE_REVENUE,
  REVENUE_INCREASE_PER_SECOND,
  BASE_POPULATION,
  POPULATION_INCREASE_PER_SECOND,
  LAST_POPULATION_UPDATE,
} from "@/utils/constants";

let currentDebt = BASE_DEBT;
let currentGDP = BASE_GDP;
let currentPopulation = BASE_POPULATION;
let currentRevenue = BASE_REVENUE;

export function calculateCurrentStats() {
  const now = Date.now();
  const secondsSinceLastUpdate = (now - REFERENCE_TIME) / 1000;

  // Calculate from the caught-up base debt
  currentDebt = BASE_DEBT + DEBT_INCREASE_PER_SECOND * secondsSinceLastUpdate;
  currentGDP = currentDebt / LAST_GDP_RATIO;
  currentRevenue =
    BASE_REVENUE + REVENUE_INCREASE_PER_SECOND * secondsSinceLastUpdate;

  currentPopulation =
    BASE_POPULATION +
    (POPULATION_INCREASE_PER_SECOND * (now - LAST_POPULATION_UPDATE)) / 1000;

  const debtThisYear = currentDebt - LAST_FEDERAL_DEBT;
  const debtDelta = debtThisYear - LAST_DEFICIT;
  const debtPerCitizen = currentDebt / currentPopulation;
  const debtToGDPRatio = (currentDebt / currentGDP) * 100;

  return {
    debt: currentDebt,
    debtThisYear: debtThisYear,
    debtDelta: debtDelta,
    debtPerCitizen: debtPerCitizen,
    debtToGDPRatio: debtToGDPRatio,
    population: currentPopulation,
    gdp: currentGDP,
    lastUpdate: now,
    debtIncreaseRate: DEBT_INCREASE_PER_SECOND,
    populationIncreaseRate: POPULATION_INCREASE_PER_SECOND,
  };
}
