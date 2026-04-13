/**
 * Govt standard limits (CPCB / BIS aligned – simplified)
 * Units assumed as per CPCB surface water norms
 */

// AI SLOP NEEDS TO BE IMPROVED 

const STANDARDS = {
  ph: { min: 6.5, max: 8.5, ideal: 7 },
  dissolved_oxygen: { min: 5, ideal: 14.6 },
  bod: { max: 3, ideal: 0 },
  nitrate: { max: 45, ideal: 0 },
  fecal_coliform: { max: 2500, ideal: 0 },
  total_coliform: { max: 5000, ideal: 0 }
};

/**
 * Utility: force numeric conversion (pg returns strings often)
 */
const num = (v) => (v === null || v === undefined ? null : Number(v));

/**
 * WQI category mapping
 */
function getWqiCategory(wqi) {
  if (wqi <= 50) return "Excellent";
  if (wqi <= 100) return "Good";
  if (wqi <= 200) return "Poor";
  if (wqi <= 300) return "Very Poor";
  return "Unsuitable for Drinking";
}

/**
 * Step 1: derive representative values
 * - worst case where relevant
 * - numeric safe
 */
function deriveParameters(row) {
  return {
    ph: (num(row.ph_min) + num(row.ph_max)) / 2,
    dissolved_oxygen: num(row.dissolved_oxygen_min),
    bod: num(row.bod_max),
    nitrate: num(row.nitrate_max),
    fecal_coliform: num(row.fecal_coliform_max),
    total_coliform: num(row.total_coliform_max)
  };
}

/**
 * Step 2: detect alarming & warning parameters
 * alarming = limit exceeded
 * warning = close to limit (early signal)
 */
function getAlarmingParameters(values) {
  const alarming = [];
  const warning = [];

  // pH
  if (values.ph < 6.5 || values.ph > 8.5) alarming.push("ph");
  else if (values.ph < 6.8 || values.ph > 8.2) warning.push("ph");

  // Dissolved Oxygen (low is bad)
  if (values.dissolved_oxygen < 5) alarming.push("dissolved_oxygen");
  else if (values.dissolved_oxygen < 6) warning.push("dissolved_oxygen");

  // BOD
  if (values.bod > 3) alarming.push("bod");
  else if (values.bod > 2) warning.push("bod");

  // Nitrate
  if (values.nitrate > 45) alarming.push("nitrate");
  else if (values.nitrate > 30) warning.push("nitrate");

  // Fecal coliform
  if (values.fecal_coliform > 2500) alarming.push("fecal_coliform");
  else if (values.fecal_coliform > 1000) warning.push("fecal_coliform");

  // Total coliform
  if (values.total_coliform > 5000) alarming.push("total_coliform");
  else if (values.total_coliform > 2500) warning.push("total_coliform");

  return {
    alarming,
    warning
  };
}

/**
 * Step 3: calculate WQI
 * Weighted Arithmetic Index (safe, clamped)
 */
function calculateWQI(values) {
  let totalQiWi = 0;
  let totalWi = 0;

  for (const param in STANDARDS) {
    const standard = STANDARDS[param];
    const value = values[param];

    if (value === null || value === undefined) continue;

    let qi = 0;

    if (param === "ph") {
      qi =
        (Math.abs(value - standard.ideal) /
          (standard.max - standard.ideal)) *
        100;
    } else if (param === "dissolved_oxygen") {
      qi =
        ((standard.ideal - value) /
          (standard.ideal - standard.min)) *
        100;
    } else {
      qi = (value / standard.max) * 100;
    }

    qi = Math.max(0, qi); // clamp negatives
    const wi = 1 / (standard.max || standard.ideal);

    totalQiWi += qi * wi;
    totalWi += wi;
  }

  return Math.round(totalQiWi / totalWi);
}

/**
 * 🔥 MAIN HELPER
 */
function computeWqiResult(row) {
  const derived = deriveParameters(row);
  const wqi = calculateWQI(derived);
  const category = getWqiCategory(wqi);

  const { alarming, warning } = getAlarmingParameters(derived);

  return {
    wqi,
    category,
    alarming_parameters: alarming,
    warning_parameters: warning,
    derived_parameters: derived // OPTIONAL but very useful for UI/debug
  };
}

module.exports = {
  deriveParameters,
  calculateWQI,
  getAlarmingParameters,
  getWqiCategory,
  computeWqiResult // Most important function
};
