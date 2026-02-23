import { calculateRack } from "./eatoncalculator.js";
import { POLICY } from "./rackAnalysis.js";

export function suggestBestSlot(serverProfile, rackServers) {

  if (!serverProfile) {
    console.warn("No serverProfile provided to suggestBestSlot");
    return null;
  }

  const TOTAL_SLOTS = 44;
  const uHeight = serverProfile.uHeight ?? 1;

  let best = null;

  for (let slot = 1; slot <= TOTAL_SLOTS; slot++) {

    // 1️⃣ Check fysieke overlap
    const overlap = rackServers.some(s => {

      if (!s.slot) return false;

      const start = s.slot;
      const height = s.uHeight ?? 1;
      const end = start + height - 1;

      return slot <= end && (slot + uHeight - 1) >= start;
    });

    if (overlap) continue;

    // 2️⃣ Bouw test rack (bestaande + nieuwe server)
    const testRack = [];

    for (const s of rackServers) {

      if (!s.serverProfile) continue;

      testRack.push({
        slot: s.slot,
        serverProfile: s.serverProfile,
        utilization: "normal"
      });
    }

    testRack.push({
      slot,
      serverProfile,
      utilization: "normal"
    });

    // 3️⃣ Bereken power
    const result = calculateRack(testRack);

    if (!result || !Array.isArray(result.banks) || !Array.isArray(result.phases)) {
      continue;
    }

    const maxBank  = Math.max(...result.banks);
    const maxPhase = Math.max(...result.phases);

    if (!isFinite(maxBank) || !isFinite(maxPhase)) {
      continue;
    }

    if (maxBank > POLICY.bankLimit) continue;
    if (maxPhase > POLICY.phaseLimit) continue;

    const score =
      (maxBank / POLICY.bankLimit) +
      (maxPhase / POLICY.phaseLimit);

    if (!isFinite(score)) continue;

    if (!best || score < best.score) {
      best = {
        slot,
        score
      };
    }
  }

  return best;

}
