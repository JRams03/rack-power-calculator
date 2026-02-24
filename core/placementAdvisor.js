/* =========================================================
   PLACEMENT ADVISOR
   ========================================================= */

import { analyzeRack, calculateRackPenalty } from "./rackAnalysis.js";

/**
 * Suggest best rack placements for a server.
 *
 * @param {Object} serverProfile - contains id + uHeight
 * @param {Array} allRacks - array of rack objects:
 *        [
 *          {
 *            rackId: "RK12",
 *            servers: [...],   // must contain { slot, uHeight, serverProfile }
 *            banks: [...],
 *            phases: [...]
 *          }
 *        ]
 *
 * @param {Function} suggestBestSlotFn - slot advisor function
 *
 * @returns {Array} top 3 rack suggestions
 */



export function suggestBestPlacement(
  serverProfile,
  allRacks,
  suggestBestSlotFn,
  selectedRoom

) {

  const racksToEvaluate = selectedRoom
  ? allRacks.filter(r => r.room === selectedRoom)
  : allRacks;

  const results = [];

  for (const rack of racksToEvaluate) {

    // 1️⃣ Rack-level analysis
    const rackServersForAnalysis = rack.servers.map(s => ({
      slot: s.slot,
      uHeight: s.uHeight ?? 1
    }));

    const rackAnalysis = analyzeRack(
      rackServersForAnalysis,
      rack.banks,
      rack.phases
    );

    const rackPenalty = calculateRackPenalty(rackAnalysis);

    // 2️⃣ Slot-level suggestion
    const slotSuggestion = suggestBestSlotFn(
      serverProfile,
      rack.servers
    );

    if (!slotSuggestion) continue;

    // 3️⃣ Slot score (comes directly from slotAdvisor)
    const slotScore = slotSuggestion.score;

    // 4️⃣ Combine rack + slot score
    const finalScore =
      rackPenalty * 0.4 +
      slotScore * 0.6;

   results.push({
  rackId: rack.rackId,
  room: rack.room,   
  slot: slotSuggestion.slot,
  rackPenalty,
  slotScore,
  finalScore,
  rackAnalysis
});
  }

  // 5️⃣ Sort ascending (lower score = better)
  results.sort((a, b) => a.finalScore - b.finalScore);

  return results.slice(0, 3);
}