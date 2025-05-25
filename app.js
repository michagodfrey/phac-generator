// phac_app_script.js

document.addEventListener("DOMContentLoaded", () => {
  const produceContainer = document.getElementById("produceEntries");
  const addProduceBtn = document.getElementById("addProduceEntry");
  let produceCount = 1;

  addProduceBtn.addEventListener("click", () => {
    if (produceCount >= 4) return;

    const newSet = document.createElement("div");
    newSet.classList.add("produce-set");
    newSet.innerHTML = `
      <hr style='margin: 1rem 0;'>
      <input type="text" name="numberOfPackages[]" placeholder="Number of Packages" class="input" />
      <input type="text" name="packageType[]" placeholder="Type of Packages (e.g., trays, cartons)" class="input" />
      <input type="text" name="carrierType[]" placeholder="Type of Carrier of Biosecurity Matter" class="input" />
    `;
    produceContainer.appendChild(newSet);
    produceCount++;
  });

  const accreditationBtn = document.getElementById("addAccreditation");
  const certFieldset = accreditationBtn.closest("fieldset");

  accreditationBtn.addEventListener("click", () => {
    const newBlock = document.createElement("div");
    newBlock.classList.add("accreditation-block");
    newBlock.innerHTML = `
      <hr style='margin: 1rem 0;'>
      <input type="text" name="procedureCode[]" placeholder="Procedure Code (e.g., ICA-39)" class="input" />
      <input type="number" name="facilityNumber[]" placeholder="Facility Number" class="input" />
      <input type="date" name="accreditationExpiry[]" placeholder="Accreditation Expiry Date" class="input" />
    `;
    certFieldset.appendChild(newBlock);
  });

  // Toggle grower/certifier fields
  const sameAsCheckbox = document.querySelector(
    "input[name='sameAsCertifier']"
  );
  const certifierFields = document.getElementById("certifierFields");

  sameAsCheckbox.addEventListener("change", (e) => {
    certifierFields.style.display = e.target.checked ? "none" : "block";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const treatmentSelect = document.getElementById("treatmentSelect");
  const liquidFields = document.getElementById("liquidTreatmentFields");
  const granularFields = document.getElementById("granularTreatmentFields");

  // Hide all treatment fields on initial load
  if (liquidFields) liquidFields.style.display = "none";
  if (granularFields) granularFields.style.display = "none";

  // Listen for changes on the treatment type selector
  if (treatmentSelect) {
    treatmentSelect.addEventListener("change", (e) => {
      const selected = e.target.value;

      // Hide both sections before showing the selected one
      liquidFields.style.display = "none";
      granularFields.style.display = "none";

      // Show the appropriate section based on user selection
      if (selected === "liquid") {
        liquidFields.style.display = "block";
      } else if (selected === "granular") {
        granularFields.style.display = "block";
      }
    });
  }

  // Optional: Logic for the 'Add Treatment/Condition' button can go here
  const addTreatmentBtn = document.getElementById("addTreatment");
  if (addTreatmentBtn) {
    addTreatmentBtn.addEventListener("click", () => {
      alert(
        "Treatment details will be added to certificate (functionality to be implemented)"
      );
      // Future logic to collect the form data and append to certificate preview goes here
    });
  }
});
