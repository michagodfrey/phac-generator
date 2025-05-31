// app.js

// Produce Entries
document.addEventListener("DOMContentLoaded", () => {
  const produceContainer = document.getElementById("produceEntries");
  const addProduceBtn = document.getElementById("addProduceEntry");
  let produceCount = 0;

  addProduceBtn.addEventListener("click", () => {
    if (produceCount >= 4) return;

    const newSet = document.createElement("div");
    newSet.classList.add("produce-set", "consignment-group");
    newSet.innerHTML = `
      <div class="form-grid">
        <div class="input-group">
          <label class="input-label">Number of Packages</label>
          <input type="number" name="numberOfPackages[]" required />
        </div>
        <div class="input-group">
          <label class="input-label">Package Type</label>
          <input type="text" name="packageType[]" placeholder="e.g., trays, cartons" required />
        </div>
        <div class="input-group">
          <label class="input-label">Carrier Type</label>
          <input type="text" name="carrierType[]" required />
        </div>
      </div>
      <button type="button" class="remove-produce">Remove Entry</button>
    `;
    produceContainer.appendChild(newSet);
    produceCount++;

    // Add remove button functionality
    const removeBtn = newSet.querySelector(".remove-produce");
    removeBtn.addEventListener("click", () => {
      newSet.remove();
      produceCount--;
      addProduceBtn.classList.remove("disabled");
      addProduceBtn.disabled = false;
    });

    // Disable add button if max entries reached
    if (produceCount >= 4) {
      addProduceBtn.classList.add("disabled");
      addProduceBtn.disabled = true;
    }
  });

  // Add Additional Accreditation
  const accreditationBtn = document.getElementById("addAccreditation");
  const certFieldset = accreditationBtn.closest("fieldset");
  let additionalAccreditationAdded = false;

  accreditationBtn.addEventListener("click", () => {
    if (additionalAccreditationAdded) {
      return; // Prevent adding more than one additional accreditation
    }

    const newBlock = document.createElement("div");
    newBlock.classList.add("accreditation-block", "consignment-group");
    newBlock.innerHTML = `
      <h3 class="section-title">Additional Accreditation</h3>
      <div class="form-grid">
        <div class="input-group">
          <label class="input-label" for="additionalProcedureCode">Procedure Code</label>
          <input type="text" id="additionalProcedureCode" name="additionalProcedureCode[]" placeholder="e.g., ICA-29" required />
        </div>
        <div class="input-group">
          <label class="input-label" for="additionalFacilityNumber">Facility Number</label>
          <input type="number" id="additionalFacilityNumber" name="additionalFacilityNumber[]" required />
        </div>
        <div class="input-group">
          <label class="input-label" for="additionalAccreditationExpiry">Accreditation Expiry</label>
          <input type="date" id="additionalAccreditationExpiry" name="additionalAccreditationExpiry[]" required />
        </div>
      </div>
      <button type="button" class="remove-accreditation">Remove Additional Accreditation</button>
    `;

    // Insert before the "Add Additional Accreditation" button
    certFieldset.insertBefore(newBlock, accreditationBtn);
    additionalAccreditationAdded = true;
    accreditationBtn.style.display = "none";

    // Add event listener to remove button
    const removeBtn = newBlock.querySelector(".remove-accreditation");
    removeBtn.addEventListener("click", () => {
      newBlock.remove();
      additionalAccreditationAdded = false;
      accreditationBtn.style.display = "block";
    });
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

// Toggle Treatment Fields
document.addEventListener("DOMContentLoaded", () => {
  const treatmentList = document.getElementById("treatmentList");
  const addTreatmentBtn = document.getElementById("addTreatmentBtn");
  let treatmentCount = 0;
  const maxTreatments = 4;

  function createTreatmentFields(index) {
    const wrapper = document.createElement("div");
    wrapper.className = "treatment-fields treatment-entry";
    wrapper.style.border = "1px solid #ccc";
    wrapper.style.margin = "1em 0";
    wrapper.style.padding = "1em";
    wrapper.innerHTML = `
      <div class="input-group">
        <label class="input-label" for="treatmentDate${index}">Treatment Date</label>
        <input type="date" id="treatmentDate${index}" name="treatmentDate[]" />
      </div>
      <div class="input-group">
        <label class="input-label" for="treatmentSelect${index}">Treatment Type</label>
        <select id="treatmentSelect${index}" name="treatmentSelect[]">
          <option value="">-- Select --</option>
          <option value="liquid">Liquid Insecticide Treatment</option>
          <option value="granular">Granular Insecticide Treatment</option>
        </select>
      </div>
      <div id="liquidTreatmentFields${index}" class="treatment-fields" style="display: none;">
        <div class="input-group">
          <label class="input-label" for="liquidChemical${index}">Liquid Chemical</label>
          <select id="liquidChemical${index}" name="liquidChemical[]">
            <option value="">Select Chemical</option>
            <option>bifenthrin 80g/L 2.5ml/L 28 days</option>
            <option>bifenthrin 100g/L 2ml/L 28 days</option>
            <option>bifenthrin 240g/L 0.8ml/L 28 days</option>
            <option>chrorpyrifos 500g/L 30-40ml/100L 28 days</option>
            <option>betacyfluthrin 25g/L 16ml/10L 72 hours</option>
          </select>
        </div>
      </div>
      <div id="granularTreatmentFields${index}" class="treatment-fields" style="display: none;">
        <div class="input-group">
          <label class="input-label" for="granularChemical${index}">Granular Chemical</label>
          <select id="granularChemical${index}" name="granularChemical[]">
            <option value="">Select Chemical</option>
            <option>bifenthrin 2g/kg 10ppm 6 months</option>
            <option>bifenthrin 2g/kg 12ppm 12 months</option>
            <option>bifenthrin 2g/kg 15ppm 24 months</option>
            <option>chrorpyrifos 100g/kg 1kg/m3 12 months</option>
          </select>
        </div>
      </div>
      <button type="button" class="remove-treatment">Remove Treatment</button>
    `;

    // Show/hide chemical fields based on treatment type
    const treatmentSelect = wrapper.querySelector(`#treatmentSelect${index}`);
    const liquidFields = wrapper.querySelector(
      `#liquidTreatmentFields${index}`
    );
    const granularFields = wrapper.querySelector(
      `#granularTreatmentFields${index}`
    );

    treatmentSelect.addEventListener("change", (e) => {
      liquidFields.style.display = "none";
      granularFields.style.display = "none";
      if (e.target.value === "liquid") {
        liquidFields.style.display = "block";
      } else if (e.target.value === "granular") {
        granularFields.style.display = "block";
      }
    });

    // Remove button logic
    wrapper.querySelector(".remove-treatment").addEventListener("click", () => {
      wrapper.remove();
      treatmentCount--;
      addTreatmentBtn.classList.remove("disabled");
    });

    return wrapper;
  }

  addTreatmentBtn.addEventListener("click", () => {
    if (treatmentCount >= maxTreatments) return;
    treatmentCount++;
    treatmentList.appendChild(createTreatmentFields(Date.now()));
    if (treatmentCount >= maxTreatments) {
      addTreatmentBtn.classList.add("disabled");
    }
  });
});

// Signature Pad Initialization
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  const signaturePad = document.getElementById("signature-pad");
  const clearButton = document.getElementById("clear-signature");

  // Set up canvas
  canvas.width = signaturePad.offsetWidth;
  canvas.height = 150;
  canvas.style.width = "100%";
  canvas.style.height = "150px";
  signaturePad.appendChild(canvas);

  // Initialize signature pad
  const signaturePadInstance = new SignaturePad(canvas, {
    backgroundColor: "rgb(255, 255, 255)",
    penColor: "rgb(0, 0, 0)",
    velocityFilterWeight: 0.7,
    minWidth: 0.5,
    maxWidth: 2.5,
    throttle: 16, // Increase smoothness
  });

  window.signaturePadInstance = signaturePadInstance;

  // Handle window resize
  window.addEventListener("resize", () => {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePadInstance.clear(); // Clear the pad after resize
  });

  // Clear button functionality
  clearButton.addEventListener("click", () => {
    signaturePadInstance.clear();
  });

  // Add signature data to form submission
  const form = document.getElementById("phacForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (signaturePadInstance.isEmpty()) {
      alert("Please provide a signature");
      return;
    }

    // Get signature data
    const signatureData = signaturePadInstance.toDataURL();
    // You can store this in a hidden input if needed
    const signatureInput = document.createElement("input");
    signatureInput.type = "hidden";
    signatureInput.name = "signatureData";
    signatureInput.value = signatureData;
    form.appendChild(signatureInput);

    // Debug logging for form data
    const formData = new FormData(form);
    console.log("Form Data before submission:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Continue with form submission
    generatePDF();
  });
});
