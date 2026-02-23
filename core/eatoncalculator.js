/* =========================================================
   EATON CALCULATOR ENGINE
   Pure rack power calculation logic
   ========================================================= */

import { calculateSlot } from "./calculator.js";

/* ==============================
   CONFIG
============================== */

export const BANK_SLOTS = [8, 8, 6, 6, 8, 8];

export const PHASE_BANKS = [
  [0, 1], // L1
  [2, 3], // L2
  [4, 5]  // L3
];

export const TOTAL_SLOTS = BANK_SLOTS.reduce((a,b)=>a+b,0);

/* ==============================
   PDU MAPPING
============================== */

export function getPDUSlotForRack(rackSlot) {
  if (rackSlot <= 22) return rackSlot;
  return rackSlot + 4;
}

export function getBankIndexFromPDUSlot(pduSlot) {
  if (pduSlot <= 8)  return 0;
  if (pduSlot <= 16) return 1;
  if (pduSlot <= 22) return 2;
  if (pduSlot <= 32) return 3;
  if (pduSlot <= 40) return 4;
  return 5;
}

export function getPhaseIndexFromPDUSlot(pduSlot) {
  if (pduSlot <= 16) return 0;
  if (pduSlot <= 32) return 1;
  return 2;
}

/* ==============================
   MAIN RACK CALCULATION
============================== */

/**
 * Calculates full rack load.
 *
 * @param {Array} rackServers
 * Format:
 * [
 *   { slot: 3, serverProfile: {...}, utilization: "normal" }
 * ]
 *
 * @returns {
 *   banks: number[6],
 *   phases: number[3],
 *   slotResults: { [slot]: calculateSlotResult }
 * }
 */
export function calculateRack(rackServers) {

  const banks  = Array(6).fill(0);
  const phases = Array(3).fill(0);
  const slotResults = {};

  for (const entry of rackServers) {

    const { slot, serverProfile, utilization } = entry;
    if (!serverProfile) continue;

    const result = calculateSlot(serverProfile, utilization || "normal");
    if (!result) continue;

    slotResults[slot] = result;

    const feeds = Math.ceil(serverProfile.psuCount / 2);
    const pduSlot = getPDUSlotForRack(slot);

    const bankIndex  = getBankIndexFromPDUSlot(pduSlot);
    const phaseIndex = getPhaseIndexFromPDUSlot(pduSlot);

    if (bankIndex != null) {
      banks[bankIndex] += result.ampsPerFeed * feeds;
    }

    if (phaseIndex != null) {
      phases[phaseIndex] += result.ampsPerFeed * feeds;
    }
  }

  return {
    banks,
    phases,
    totalAmp: phases.reduce((a,b)=>a+b,0),
    slotResults
  };
}