const standardPotentials = {
  "Zn": -0.76,
  "Mg": -2.37,
  "Al": -1.66,
  "Fe": -0.44,
  "Cu": 0.34,
  "Ag": 0.80,
  "Au": 1.50,
  "Pt": 1.20
};

const concentrations = [0.001, 0.01, 0.1, 1.0, 2.0];

const anodeMetals = ["Zn", "Mg", "Al", "Fe"];
const cathodeMetals = ["Cu", "Ag", "Au", "Pt"];

function populateDropdown(id, options) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = '';
  options.forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    dropdown.appendChild(opt);
  });
}

populateDropdown("anode", anodeMetals);
populateDropdown("cathode", cathodeMetals);
populateDropdown("anodeConcentration", concentrations);
populateDropdown("cathodeConcentration", concentrations);

function calculateE(actualE0, concentration, n = 2) {
  return actualE0 - (0.0591 / n) * Math.log10(1 / concentration);
}

document.getElementById("calculateBtn").addEventListener("click", () => {
  const anode = document.getElementById("anode").value;
  const cathode = document.getElementById("cathode").value;
  const anConc = parseFloat(document.getElementById("anodeConcentration").value);
  const catConc = parseFloat(document.getElementById("cathodeConcentration").value);

  const Eanode = calculateE(standardPotentials[anode], anConc);
  const Ecathode = calculateE(standardPotentials[cathode], catConc);

  const Ecell = Ecathode - Eanode;

  document.getElementById("result").textContent =
    `E°cell = ${Ecell.toFixed(2)} V`;
});
