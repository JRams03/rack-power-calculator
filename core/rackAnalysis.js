/* =========================================================
   RACK POLICY CONFIG
   ========================================================= */

export const POLICY = {
  bankLimit: 6.5,
  phaseLimit: 13,

  softPhasePercent: 0.85,
  softBankPercent: 0.80,

  imbalanceThreshold: 0.30,
  maxRackFillPercent: 0.75
};


/* =========================================================
   RACK ANALYSIS
   ========================================================= */

/**
 * Analyzes rack health metrics.
 *
 * @param {Array} rackServers - servers in this rack
 * @param {Array} banks - current bank loads
 * @param {Array} phases - current phase loads
 * @returns {Object} rack analysis metrics
 */
export function analyzeRack(rackServers, banks, phases) {

  const TOTAL_U = 44;

// -----------------------------
// Power ratios
// -----------------------------
const maxPhase = Math.max(...phases);
const maxBank  = Math.max(...banks);

const maxPhaseRatio = maxPhase / POLICY.phaseLimit;
const maxBankRatio  = maxBank  / POLICY.bankLimit;

// Imbalance alleen relevant bij serieuze load
const avgPhase =
  phases.reduce((sum, p) => sum + p, 0) / phases.length;

let phaseImbalance = 0;

if (maxPhaseRatio > 0.5) {
  phaseImbalance =
    avgPhase === 0
      ? 0
      : (Math.max(...phases) - Math.min(...phases)) / avgPhase;
}
  // -----------------------------
  // Physical occupancy
  // -----------------------------
  const occupied = new Set();

  rackServers.forEach(s => {
    const height = s.uHeight ?? 1;
    for (let i = 0; i < height; i++) {
      occupied.add(s.slot + i);
    }
  });

  const fillPercent = occupied.size / TOTAL_U;
  const totalFreeU = TOTAL_U - occupied.size;

  // -----------------------------
  // Largest contiguous free block
  // -----------------------------
  let largestFreeBlock = 0;
  let currentBlock = 0;

  for (let i = 1; i <= TOTAL_U; i++) {
    if (!occupied.has(i)) {
      currentBlock++;
      if (currentBlock > largestFreeBlock) {
        largestFreeBlock = currentBlock;
      }
    } else {
      currentBlock = 0;
    }
  }

  return {
    maxPhaseRatio,
    maxBankRatio,
    phaseImbalance,
    fillPercent,
    largestFreeBlock,
    totalFreeU
  };
}


/* =========================================================
   RACK PENALTY CALCULATION
   ========================================================= */

/**
 * Converts rack analysis into a penalty score.
 * Lower = healthier rack.
 *
 * @param {Object} rackData
 * @returns {Number} penalty score
 */
export function calculateRackPenalty(rackData) {

  let penalty = 0;

  if (rackData.maxPhaseRatio > POLICY.softPhasePercent)
    penalty += 1.0;

  if (rackData.maxBankRatio > POLICY.softBankPercent)
    penalty += 0.8;

  if (rackData.phaseImbalance > POLICY.imbalanceThreshold)
    penalty += 0.5;

  if (rackData.fillPercent > POLICY.maxRackFillPercent)
    penalty += 0.4;

  return penalty;
}