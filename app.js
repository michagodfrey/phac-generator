// app.js

// Produce Entries
document.addEventListener("DOMContentLoaded", () => {
  const produceContainer = document.getElementById("produceEntries");
  const addProduceBtn = document.getElementById("addProduceEntry");
  let produceCount = 1;

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
          <input type="text" id="additionalProcedureCode" name="procedureCode[]" placeholder="e.g., ICA-29" required />
        </div>
        <div class="input-group">
          <label class="input-label" for="additionalFacilityNumber">Facility Number</label>
          <input type="number" id="additionalFacilityNumber" name="facilityNumber[]" />
        </div>
        <div class="input-group">
          <label class="input-label" for="additionalAccreditationExpiry">Accreditation Expiry</label>
          <input type="date" id="additionalAccreditationExpiry" name="accreditationExpiry[]" required />
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

// Fill Form with Test Data
document.addEventListener("DOMContentLoaded", () => {
  const fillDummyDataBtn = document.getElementById("fillDummyData");

  if (fillDummyDataBtn) {
    fillDummyDataBtn.addEventListener("click", () => {
      // Consignment Details
      document.getElementById("consignorName").value =
        "Green Valley Nursery Pty Ltd";
      document.getElementById("consignorAddress").value =
        "123 Plant Street\nGreen Valley NSW 2168";
      document.getElementById("consigneeName").value = "City Garden Centre";
      document.getElementById("consigneeAddress").value =
        "456 Flower Road\nSydney NSW 2000";
      document.getElementById("transportMethod").value = "road";
      document.getElementById("transportDetails").value = "Truck Reg: ABC123";

      // Certification Details
      document.getElementById("ipNumber").value = "Q1234";
      document.getElementById("facilityNumber").value = "789";
      document.getElementById("brandName").value = "Green Valley Premium";
      document.getElementById("dateCode").value = "GV2024";
      document.getElementById("procedureCode").value = "ICA-39";
      document.getElementById("accreditationExpiry").value = "2025-12-31";

      // Treatment Details
      document.getElementById("invoiceNumber").value = "INV-2024-001";

      // Add a produce entry
      const produceContainer = document.getElementById("produceEntries");
      const newSet = document.createElement("div");
      // newSet.classList.add("produce-set", "consignment-group");
      // newSet.innerHTML = `
      //   <div class="form-grid">
      //     <div class="input-group">
      //       <label class="input-label">Number of Packages</label>
      //       <input type="number" name="numberOfPackages[]" value="100" required />
      //     </div>
      //     <div class="input-group">
      //       <label class="input-label">Package Type</label>
      //       <input type="text" name="packageType[]" value="Trays" required />
      //     </div>
      //     <div class="input-group">
      //       <label class="input-label">Carrier Type</label>
      //       <input type="text" name="carrierType[]" value="Nursery Stock" required />
      //     </div>
      //   </div>
      //   <button type="button" class="remove-produce">Remove Entry</button>
      // `;
      produceContainer.appendChild(newSet);

      // Set treatment details
      document.getElementById("treatmentSelect").value = "liquid";
      document.getElementById("liquidChemical").value =
        "bifenthrin 80g/L 2.5ml/L 28 days";

      // Declaration
      document.getElementById("signatoryName").value = "John Smith";
      document.getElementById("issueDate").value = new Date()
        .toISOString()
        .split("T")[0];

      // Show the treatment fields
      document.getElementById("liquidTreatmentFields").style.display = "block";
    });
  }
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

    // Continue with form submission
    // This will be replaced with PDF generation code
    console.log("Form submitted with signature");
  });
});
