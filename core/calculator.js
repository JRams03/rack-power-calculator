




const UTIL = { low:0.40, normal:0.50, high:0.75, max:0.90 };

export const LIMITS = { bank: 8.0, phase: 16.0 }; const FEED_COUNT = 2; 



export function calculateSlot(server, utilization) {
  if (!server) return null;

  const effectiveWatts = server.psuWatts * UTIL[utilization];
  const totalAmps = effectiveWatts / server.voltage;

  let ampsPerFeed;

  if (server.psuCount === 1) {
    ampsPerFeed = totalAmps;
  } else {
    ampsPerFeed = totalAmps / 2;
  }

  return { totalAmps, ampsPerFeed };
}


export function calculateBanks(slotResults) {
  const banks = {};
  for (const [slot, res] of Object.entries(slotResults)) {
    if (!res) continue;
    const idx = Math.floor((slot - 1) / 8);
    banks[idx] = (banks[idx] || 0) + res.ampsPerFeed;
  }
  return banks;
}



export function calculatePhases(slotResults) {
  const phases = {};
  for (const [slot, res] of Object.entries(slotResults)) {
    if (!res) continue;
    const idx = Math.floor((slot - 1) / 16);
    phases[idx] = (phases[idx] || 0) + res.ampsPerFeed;
  }
  return phases;
}



export function usagePercent(amps, limit) {
  return Math.min(Math.max(amps / limit, 0), 1);
}
