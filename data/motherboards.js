
/* THIS IS USED FOR THE SERVER POWER CALCULATOR*/

export const MOTHERBOARDS = [
  {
    id: "supermicro_x11dpu",
    name: "Supermicro X11DPU",
    socket: "LGA 3647",
    maxCpu: 2,
    ramGeneration: "DDR4",
    memorySupport: ["REG"],
    ramSlots: 24,
    basePower: 80
  },
  {
    id: "supermicro_x11qph",
    name: "Supermicro X11QPH",
    socket: "LGA 3647",
    maxCpu: 4,
    ramGeneration: "DDR4",
    memorySupport: ["REG"],
    ramSlots: 48,
    basePower: 100
  },
  {
    id: "supermicro_x11scw",
    name: "Supermicro X11SCW",
    socket: "LGA 1151",
    maxCpu: 1,
    ramGeneration: "DDR4",
    memorySupport: ["NON_REG"],
    ramSlots: 4,
    basePower: 50
  },
];
