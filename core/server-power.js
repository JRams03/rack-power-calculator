import { MOTHERBOARDS } from "../data/motherboards.js";
import { CPUS } from "../data/cpus.js";
import { GPUS } from "../data/gpus.js";


export function initServerPower() {

  const RAM_POWER = {
    DDR5: {
      NON_REG: 8,
      REG: 10
    },

    DDR4: {
      NON_REG: 6,
      REG: 8
    },

    DDR3: {
      NON_REG: 4,
      REG: 2
    }
  };

  /* =========================
     DOM
  ========================== */
  const manufacturerSelect = document.getElementById("manufacturer");
  const motherboardSelect = document.getElementById("motherboard");
  const cpuSelect = document.getElementById("cpu");
  const ramTypeSelect = document.getElementById("ramType");
  const ramCountInput = document.getElementById("ramCount");
  const cpuInfoCores = document.getElementById("cpuCores");
  const cpuInfoTdp = document.getElementById("cpuTdp");
  const cpuInfoGen = document.getElementById("cpuGen");
  const cpuInfoSocket = document.getElementById("cpuSocket");
  const driveContainer = document.getElementById("driveContainer");
  const addDriveBtn = document.getElementById("addDrive");
  const gpuSelect = document.getElementById("gpu");
  const gpuCountInput = document.getElementById("gpuCount");
  const gpuInfoVram = document.getElementById("gpuVram");
  const gpuInfoTdp = document.getElementById("gpuTdp");
  const gpuInfoGen = document.getElementById("gpuGen");
  const voltageSelect = document.getElementById("voltage");


  cpuSelect.disabled = true;
  ramTypeSelect.disabled = true;
  ramCountInput.disabled = true;


  /* =========================
     Populate Motherboards
  ========================== */

function populateMotherboards() {

  motherboardSelect.innerHTML = "";

  const selectedManufacturer = manufacturerSelect.value;

  // Placeholder
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select Motherboard";
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.hidden = true;
  motherboardSelect.appendChild(placeholder);

  if (!selectedManufacturer) {
    motherboardSelect.disabled = true;
    return;
  }

  motherboardSelect.disabled = false;

  const filteredBoards = MOTHERBOARDS.filter(
    b => b.manufacturer === selectedManufacturer
  );

  filteredBoards.forEach(board => {
    const option = document.createElement("option");
    option.value = board.id;
    option.textContent = board.name;
    motherboardSelect.appendChild(option);
  });
}



  /* =========================
     Populate CPUs
  ========================== */

function populateCPUs(board) {

  cpuSelect.innerHTML = "";

  // Placeholder
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select CPU";
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.hidden = true;
  cpuSelect.appendChild(placeholder);

  const compatible = CPUS.filter(cpu => cpu.socket === board.socket);

  compatible.forEach(cpu => {
    const option = document.createElement("option");
    option.value = cpu.name;
    option.textContent =
      `${cpu.name} – ${cpu.cores}C – ${cpu.power}W × ${board.maxCpu}`;
    cpuSelect.appendChild(option);
  });

  cpuSelect.disabled = false;
}

function updateCpuInfo() {

  const cpu = CPUS.find(c => c.name === cpuSelect.value);

  if (!cpu) {
    cpuInfoCores.textContent = "-";
    cpuInfoTdp.textContent = "-";
    cpuInfoGen.textContent = "-";
    cpuInfoSocket.textContent = "-";
    return;
  }

  cpuInfoCores.textContent = cpu.cores;
  cpuInfoTdp.textContent = cpu.power;
  cpuInfoGen.textContent = cpu.generation;
  cpuInfoSocket.textContent = cpu.socket;
}


  /* =========================
     Populate RAM
  ========================== */

function populateRAM(board) {

  ramTypeSelect.innerHTML = "";

  const supportedTypes = board.memorySupport;

  supportedTypes.forEach(type => {

    const watt = RAM_POWER[board.ramGeneration][type];

    const label = type === "REG"
      ? `${board.ramGeneration} Registered (${watt}W per DIMM)`
      : `${board.ramGeneration} Non-Registered (${watt}W per DIMM)`;

    const option = document.createElement("option");
    option.value = watt;
    option.textContent = label;
    ramTypeSelect.appendChild(option);
  });

  // Auto select first option
  ramTypeSelect.selectedIndex = 0;

  // Disable RAM type (automatic)
  ramTypeSelect.disabled = true;

  // Enable only count
  ramCountInput.disabled = false;
  ramCountInput.value = 0;
  ramCountInput.max = board.ramSlots;
}


function enforceRamLimit(board) {
  const max = board.ramSlots;
  let value = +ramCountInput.value || 0;

  if (value > max) ramCountInput.value = max;
  if (value < 0) ramCountInput.value = 0;
}


  /* =========================
     Drives
  ========================== */

  addDriveBtn.addEventListener("click", () => {

    const newRow = document.createElement("div");
    newRow.classList.add("drive-row");

    newRow.innerHTML = `
      <select class="driveType">
        <option value="5">SATA SSD (5W)</option>
        <option value="8">SAS SSD (8W)</option>
        <option value="12">NVMe (12W)</option>
        <option value="10">3.5 HDD (10W)</option>
      </select>
      <input type="number" class="driveCount" value="0" min="0">
    `;

    driveContainer.appendChild(newRow);

    newRow.querySelectorAll("select, input")
      .forEach(el => el.addEventListener("input", calculate));
  });

  /* =========================
     GPUs
  ========================== */

  function populateGPUs() {
    gpuSelect.innerHTML = "";

    const noneOption = document.createElement("option");
    noneOption.value = "";
    noneOption.textContent = "None";
    gpuSelect.appendChild(noneOption);

    GPUS.forEach(gpu => {
      const option = document.createElement("option");
      option.value = gpu.name;
      option.textContent =
        `${gpu.name} – ${gpu.power}W – ${gpu.vram}`;
      gpuSelect.appendChild(option);
    });
  }

  function updateGpuInfo() {

    const gpu = GPUS.find(g => g.name === gpuSelect.value);

    if (!gpu) {
      gpuInfoVram.textContent = "-";
      gpuInfoTdp.textContent = "-";
      gpuInfoGen.textContent = "-";
      return;
    }

    gpuInfoVram.textContent = gpu.vram;
    gpuInfoTdp.textContent = gpu.power;
    gpuInfoGen.textContent = gpu.generation;
  }

  /* =========================
     Calculation
  ========================== */

  function calculate() {

    const board = MOTHERBOARDS.find(
      b => b.id === motherboardSelect.value
    );
    if (!board) return;

    const cpu = CPUS.find(c => c.name === cpuSelect.value);
    if (!cpu) return;

    enforceRamLimit(board);

    const motherboardPower = board.basePower;
    const cpuTotal = cpu.power * board.maxCpu;

    const ramTotal =
      (+ramTypeSelect.value || 0) *
      (+ramCountInput.value || 0);

    let driveTotal = 0;
    document.querySelectorAll(".drive-row").forEach(row => {
      const type = +row.querySelector(".driveType").value || 0;
      const count = +row.querySelector(".driveCount").value || 0;
      driveTotal += type * count;
    });

    const selectedGpu = GPUS.find(g => g.name === gpuSelect.value);
    const gpuTotal =
      selectedGpu
        ? selectedGpu.power * (+gpuCountInput.value || 0)
        : 0;

    const total =
      motherboardPower +
      cpuTotal +
      ramTotal +
      driveTotal +
      gpuTotal;
    
    const voltage = +voltageSelect.value || 230;
    const ampDraw = total / voltage;


    document.getElementById("moboPower").textContent = motherboardPower;
    document.getElementById("cpuPowerTotal").textContent = cpuTotal;
    document.getElementById("ramPowerTotal").textContent = ramTotal;
    document.getElementById("drivePowerTotal").textContent = driveTotal;
    document.getElementById("gpuPowerTotal").textContent = gpuTotal;
    document.getElementById("totalPower").textContent = total;
    document.getElementById("ampDraw").textContent = ampDraw.toFixed(2);

  }

  /* =========================
     Motherboard Change
  ========================== */

  function handleMotherboardChange() {
    const board = MOTHERBOARDS.find(
      b => b.id === motherboardSelect.value
    );
    if (!board) return;

    populateCPUs(board);
    populateRAM(board);

    updateCpuInfo();
    calculate();
  

    if (!board) {

    ramTypeSelect.innerHTML = "";
    ramTypeSelect.disabled = true;

    ramCountInput.value = 0;
    ramCountInput.disabled = true;

    return;
  }}

  /* =========================
     Init
  ========================== */

populateGPUs();
updateGpuInfo();
populateMotherboards();

manufacturerSelect.addEventListener("change", () => {

  populateMotherboards();

  // Reset CPU
  cpuSelect.innerHTML = "";
  cpuSelect.disabled = true;

  cpuInfoCores.textContent = "-";
  cpuInfoTdp.textContent = "-";
  cpuInfoGen.textContent = "-";
  cpuInfoSocket.textContent = "-";

  // Reset RAM
  ramTypeSelect.innerHTML = "";
  ramTypeSelect.disabled = true;
  ramCountInput.value = 0;
  ramCountInput.disabled = true;

});


motherboardSelect.addEventListener("change", handleMotherboardChange);

cpuSelect.addEventListener("change", () => {
  updateCpuInfo();
  calculate();
});

gpuSelect.addEventListener("change", () => {
  updateGpuInfo();
  calculate();
});

gpuCountInput.addEventListener("input", calculate);
voltageSelect.addEventListener("change", calculate);




  document.querySelectorAll("select, input")
    .forEach(el => el.addEventListener("input", calculate));
}
