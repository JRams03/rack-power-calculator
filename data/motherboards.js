
/* THIS IS USED FOR THE SERVER POWER CALCULATOR*/

export const MOTHERBOARDS = [


/*----------X10----------*/

{
  id: "supermicro_x10slh_1u",
  manufacturer: "Supermicro",
  name: "X10SLH (1U)",
  socket: "LGA 1150",
  maxCpu: 1,
  ramGeneration: "DDR3",
  memorySupport: ["NON_REG"],
  ramSlots: 4,
  basePower: 55
},
{
  id: "supermicro_x10slm_1u",
  manufacturer: "Supermicro",
  name: "X10SLM (1U)",
  socket: "LGA 1150",
  maxCpu: 1,
  ramGeneration: "DDR3",
  memorySupport: ["NON_REG"],
  ramSlots: 4,
  basePower: 50
},
{
  id: "supermicro_x10dru_1u",
  manufacturer: "Supermicro",
  name: "X10DRU (1U)",
  socket: "LGA 2011-3",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 85
},
{
  id: "supermicro_x10dru_2u",
  manufacturer: "Supermicro",
  name: "X10DRU (2U)",
  socket: "LGA 2011-3",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 80
},
{
  id: "supermicro_x10dri_4u",
  manufacturer: "Supermicro",
  name: "X10DRI (4U)",
  socket: "LGA 2011-3",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 90
},
{
  id: "supermicro_x10qbi_4u_mem1",
  manufacturer: "Supermicro",
  name: "X10QBI MEM1 (4U)",
  socket: "LGA 2011",
  maxCpu: 4,
  ramGeneration: "DDR3",
  memorySupport: ["REG"],
  ramSlots: 32,
  basePower: 130
},
{
  id: "supermicro_x10qbi_4u_mem2",
  manufacturer: "Supermicro",
  name: "X10QBI MEM2 (4U)",
  socket: "LGA 2011",
  maxCpu: 4,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 32,
  basePower: 130
},




/*----------X11----------*/

{
  id: "supermicro_x11dpu_1u",
  manufacturer: "Supermicro",
  name: "X11DPU 1U",
  socket: "LGA 3647",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 24,
  basePower: 80
},
{
  id: "supermicro_x11dpu_2u",
  manufacturer: "Supermicro",
  name: "X11DPU 2U",
  socket: "LGA 3647",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 24,
  basePower: 60
},
{
  id: "supermicro_x11qph_2u",
  manufacturer: "Supermicro",
  name: "X11QPH 2U",
  socket: "LGA 3647",
  maxCpu: 4,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 48,
  basePower: 100
},
{
  id: "supermicro_x11scw_1u",
  manufacturer: "Supermicro",
  name: "X11SCW 1U",
  socket: "LGA 1151",
  maxCpu: 1,
  ramGeneration: "DDR4",
  memorySupport: ["NON_REG"],
  ramSlots: 4,
  basePower: 50
},
{
  id: "supermicro_x11ssw_1u",
  manufacturer: "Supermicro",
  name: "X11SSW (1U)",
  socket: "LGA 1151",
  maxCpu: 1,
  ramGeneration: "DDR4",
  memorySupport: ["NON_REG"],
  ramSlots: 4,
  basePower: 60
},



  /*----------H11----------*/

{
  id: "supermicro_h11dsu_2u",
  manufacturer: "Supermicro",
  name: "H11DSU (2U)",
  socket: "SP3",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 95
},




  /*----------X13----------*/

{
  id: "supermicro_x13dei_4u",
  manufacturer: "Supermicro",
  name: "X13DEI (4U)",
  socket: "LGA 4677",
  maxCpu: 2,
  ramGeneration: "DDR5",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 120
},



/* ===============================
   ------------Lenovo-------------
   =============================== */


{
  id: "x3550_m5",
  manufacturer: "Lenovo",
  name: "x3550 M5 (1U)",
  socket: "LGA 2011-3",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 85
},
{
  id: "x3250_m6",
  manufacturer: "Lenovo",
  name: "System x3250 M6 (1U)",
  socket: "LGA 1151",
  maxCpu: 1,
  ramGeneration: "DDR4",
  memorySupport: ["NON_REG"],
  ramSlots: 4,
  basePower: 55
},
{
  id: "sr645",
  manufacturer: "Lenovo",
  name: "SR645 (1U)",
  socket: "SP3",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 24,
  basePower: 80
},
{
  id: "sr630",
  manufacturer: "Lenovo",
  name: "SR630 (1U)",
  socket: "LGA 3647",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 95
},
{
  id: "sr650",
  manufacturer: "Lenovo",
  name: "SR650 (2U)",
  socket: "LGA 3647",
  maxCpu: 2,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 90
},
{
  id: "sr650_v3",
  manufacturer: "Lenovo",
  name: "SR650 V3 (2U)",
  socket: "LGA 4677",
  maxCpu: 2,
  ramGeneration: "DDR5",
  memorySupport: ["REG"],
  ramSlots: 16,
  basePower: 115
},
{
  id: "sr950",
  manufacturer: "Lenovo",
  name: "SR950 (4U)",
  socket: "LGA 3647",
  maxCpu: 4,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 48,
  basePower: 135
},
{
  id: "x3950_x6",
  manufacturer: "Lenovo",
  name: "System x3950 X6",
  socket: " LGA 3647",
  maxCpu: 8,
  ramGeneration: "DDR4",
  memorySupport: ["REG"],
  ramSlots: 96,
  basePower: 160
},



];

