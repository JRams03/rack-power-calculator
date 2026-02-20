/*
=========================================================
SERVER IMPORT CONTRACT (READ BEFORE ADDING A SERVER)
=========================================================

Every server entry in this file MUST follow the rules below
to work correctly with the CSV import logic in eaton.html.

CHECKLIST (verify all items):

[ ] id
    - Must be unique
    - May include suffixes like "-1U" or "-2U"
    - Used as an internal key only
    - NEVER used for CSV matching

[ ] baseId
    - Lowercase only
    - Represents the core model name WITHOUT U-height
      Examples:
        "x11dpu"
        "sr650"
        "x10dru"

[ ] uHeight
    - Integer: 1, 2, or 4
    - Must reflect the physical rack height
    - Used for:
        - slot blocking
        - slot suggestion algorithm
        - CSV import variant selection

[ ] CSV MODEL MATCHING (CRITICAL)
    The CSV file often does NOT contain the exact model name.
    baseId MUST match a substring that actually appears
    somewhere in the CSV block.

    Common CSV examples:
      "X11DPU rev2"
      "SR650"
      "Lenovo SR645"

    → CSV matching is case-insensitive
    → baseId is matched as a simple substring

[ ] U-HEIGHT DETECTION
    CSV may indicate height in multiple formats:
      "1U"
      "2U"
      "2U/12D"
      "Version: 2U"

    Import logic searches for:
      "1u", "2u", "4u"

    If no U-height is found in the CSV:
      → uHeight from servers.js is used as fallback

[ ] VARIANTS (1U / 2U / 4U)
    Each physical variant MUST be a separate entry:
      - Same baseId
      - Different uHeight

    Example:
      X11DPU-1U (uHeight: 1)
      X11DPU-2U (uHeight: 2)

[ ] GENERATION
    Some models might have generational variables:
      - Same baseId + Generation: sr650-v3
      
---------------------------------------------------------
If a server is imported as "UNKNOWN":

1. Inspect the CSV block (slot line + following metadata)
2. Identify which substring represents the model
3. Ensure baseId matches that substring (lowercase)
=========================================================
*/


export const servers = [

  /* =========================================================
                            LENOVO
   ========================================================= */


  {
    id: "x3550 m5",
    baseId: "x3550 m5",
    name: "Lenovo x3550 M5 1U",
    psuCount: 2,
    psuWatts: 900,
    voltage: 230,
    uHeight: 1,
    wiki: ""
  },
  {
    id: "Systemx3250 M6",
    baseId: "systemx3250 m6",
    name: "Lenovo Systemx3250 M6 1U",
    psuCount: 2,
    psuWatts: 450,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/Systemx3250-M6"
  },   
  {
    id: "SR645",
    baseId: "sr645",
    name: "Lenovo SR645 1U",
    psuCount: 2,
    psuWatts: 1800,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/SR645"
  },
  {
    id: "SR630",
    baseId: "sr630",
    name: "Lenovo SR630 1U",
    psuCount: 2,
    psuWatts: 1100,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/SR630"
  },
  {
    id: "SR650",
    baseId: "sr650",
    name: "Lenovo SR650 2U",
    psuCount: 2,
    psuWatts: 1100,
    voltage: 230,
    uHeight: 2,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/SR650"
  },
  {
    id: "SR650-V3",
    baseId: "sr650-v3",
    generation: "v3",
    name: "Lenovo SR650-V3 2U",
    psuCount: 2,
    psuWatts: 1800,
    voltage: 230,
    uHeight: 2,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/SR650-V3"
  },
  {
    id: "SR950",
    baseId: "sr950",
    name: "Lenovo SR950 4U",
    psuCount: 4,
    psuWatts: 1600,
    voltage: 230,
    uHeight: 4,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/SR950/"
  },
 {
    id: "System x3950 X6",
    baseId: "x3950 x6",
    name: "Lenovo System x3950 X6 8U",
    psuCount: 8,
    psuWatts: 1400,
    voltage: 230,
    uHeight: 8,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/SR950/"
  },


  {
    id: "-------------",
    baseId: "-------------",
    name: "------------------------------",
    psuCount: 1,
    psuWatts: 0,
    voltage: 1,
    uHeight: 1,
    blocked: true
  },


/* =========================================================
                     SUPERMICRO
   ========================================================= */
/*================= ====X9==== =================*/

  {
    id: "X9SCI-1U",
    baseId: "x9sci",
    name: "Supermicro X9SCI 1U",
    psuCount: 1,
    psuWatts: 600,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X9SCI-LN4F/"
  },
  {
    id: "X9QRI-4U",
    baseId: "x9qri",
    name: "Supermicro X9QRI 4U",
    psuCount: 2,
    psuWatts: 1620,
    voltage: 230,
    uHeight: 4,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X9QRI-F+/"
  },
  {
    id: "X9DRI-1U",
    baseId: "x9dri",
    name: "Supermicro X9DRI 1U",
    psuCount: 1,
    psuWatts: 600,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X9DRI-LN4F+/"
  },   
  {
    id: "X9DRI-2U",
    baseId: "x9dri",
    name: "Supermicro X9DRI 2U",
    psuCount: 1,
    psuWatts: 920,
    voltage: 230,
    uHeight: 2,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X9DRI-LN4F+/"
  },
  {
    id: "X9DRI-4U",
    baseId: "x9dri",
    name: "Supermicro X9DRI 4U",
    psuCount: 1,
    psuWatts: 1400,
    voltage: 230,
    uHeight: 4,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X9DRI-LN4F+/"
  }, 


    {
    id: "-------------",
    baseId: "-------------",
    name: "------------------------------",
    psuCount: 1,
    psuWatts: 0,
    voltage: 1,
    uHeight: 1,
    blocked: true
  },

/*================= ====X10=== =================*/
  {
    id: "X10SLH-1U",
    baseId: "x10slh",
    name: "Supermicro X10SLH 1U",
    psuCount: 1,
    psuWatts: 340,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X10SLH-LN6TF/"
  },
  {
    id: "X10SLM-1U",
    baseId: "x10slm",
    name: "Supermicro X10SLM 1U",
    psuCount: 1,
    psuWatts: 340,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X10SLM+-LN4F/"
  },
  {
    id: "X10DRU-1U",
    baseId: "x10dru",
    name: "Supermicro X10DRU 1U",
    psuCount: 2,
    psuWatts: 750,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X10DRU-i+"
  },
  {
    id: "X10DRU-2U",
    baseId: "x10dru",
    name: "Supermicro X10DRU 2U",
    psuCount: 2,
    psuWatts: 750,
    voltage: 230,
    uHeight: 2,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X10DRU-i+"
  },
  {
    id: "X10DRI-4U",
    baseId: "x10dri",
    name: "Supermicro X10DRI 4U",
    psuCount: 2,
    psuWatts: 1280,
    voltage: 230,
    uHeight: 4,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X10DRI-T4+"
  },
  {
    id: "X10QBI-4U",
    baseId: "x10qbi",
    name: "Supermicro X10QBI 4U",
    psuCount: 4,
    psuWatts: 1620,
    voltage: 230,
    uHeight: 4,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X10QBI"
  },

  {
    id: "-------------",
    baseId: "-------------",
    name: "------------------------------",
    psuCount: 1,
    psuWatts: 0,
    voltage: 1,
    uHeight: 1,
    blocked: true
  },

/*================= ====X11=== =================*/

  {
    id: "X11DPU-1U",
    baseId: "x11dpu",
    name: "Supermicro X11DPU 1U",
    psuCount: 2,
    psuWatts: 750,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X11DPU+"
  },
  {
    id: "X11DPU-2U",
    baseId: "x11dpu",
    name: "Supermicro X11DPU 2U",
    psuCount: 2,
    psuWatts: 1000,
    voltage: 230,
    uHeight: 2,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X11DPU+"
  },
  {
    id: "X11QPH-2U",
    baseId: "x11qph",
    name: "Supermicro X11QPH 2U",
    psuCount: 2,
    psuWatts: 1600,
    voltage: 230,
    uHeight: 2,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X11QPH+"
  },
   {
    id: "X11SCW-1U",
    baseId: "x11scw",
    name: "Supermicro X11SCW 1U",
    psuCount: 2,
    psuWatts: 500,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X11SCW-F_R1.10"
  },
   {
    id: "X11SSW-1U",
    baseId: "x11ssw",
    name: "Supermicro X11SSW 1U",
    psuCount: 2,
    psuWatts: 340,
    voltage: 230,
    uHeight: 1,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X11SSW-4TF/"
  },


  {
    id: "-------------",
    baseId: "-------------",
    name: "------------------------------",
    psuCount: 1,
    psuWatts: 0,
    voltage: 1,
    uHeight: 1,
    blocked: true
  },  

  /*================= ====X13=== =================*/

  {
    id: "X13DEI-4U",
    baseId: "x13dei",
    name: "Supermicro X13DEI-4U",
    psuCount: 2,
    psuWatts: 1600,
    voltage: 230,
    uHeight: 4,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/X13DEI-T/"
  },


  {
    id: "-------------",
    baseId: "-------------",
    name: "------------------------------",
    psuCount: 1,
    psuWatts: 0,
    voltage: 1,
    uHeight: 1,
    blocked: true
  },
/*================= ====H11=== =================*/

  {
    id: "H11DSU-2U",
    baseId: "h11dsu",
    name: "Supermicro H11DSU 2U",
    psuCount: 2,
    psuWatts: 1600,
    voltage: 230,
    uHeight: 2,
    wiki: "https://pages.github.ibm.com/iaas-dcops/sliki/Hardware/Motherboards/H11DSU-iN_R2.10"
  },

];
