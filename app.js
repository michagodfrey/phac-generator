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
        "123 Plant Street\nGreen Valley QLD 4690";
      document.getElementById("consigneeName").value = "City Garden Centre";
      document.getElementById("consigneeAddress").value =
        "456 Flower Road\nSydney NSW 2000";
      document.getElementById("transportMethod").value = "road";
      document.getElementById("transportDetails").value = "Truck Reg: ABC123";

      // Certification Details
      document.getElementById("ipNumber").value = "Q1234";
      document.getElementById("facilityNumber").value = "01";
      document.getElementById("brandName").value = "Green Valley Premium";
      document.getElementById("dateCode").value = "GV2024";
      document.getElementById("procedureCode").value = "ICA-39";
      document.getElementById("accreditationExpiry").value = "2025-12-31";

      // Treatment Details
      document.getElementById("invoiceNumber").value = "INV-2024-001";

      // Add a produce entry
      // const produceContainer = document.getElementById("produceEntries");
      // const newSet = document.createElement("div");
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
      // produceContainer.appendChild(newSet);

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

// PDF Generation
document
  .getElementById("generatePDFBtn")
  .addEventListener("click", generatePDF);

function generatePDF() {
  const form = document.getElementById("phacForm");
  const formData = new FormData(form);
  const data = {};
  for (let [key, value] of formData.entries()) {
    if (data[key]) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  }
  const signatureDataUrl = data.signatureData || "";
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // --- HEADER ---
  doc.setFontSize(12).setFont(undefined, "bold");
  doc.rect(10, 10, 25, 25); // Placeholder box for logo
  doc.text("Queensland", 12, 14);
  doc.text("Government", 12, 19);
  doc.setFontSize(16).setFont(undefined, "bold");
  doc.text("Plant Health Assurance Certificate", 60, 16);
  doc.setFontSize(9).setFont(undefined, "italic");
  doc.text(
    "Pursuant to Sections 412 and 413 of the Biosecurity Act 2014",
    60,
    20
  );
  doc.setFontSize(10).setFont(undefined, "normal");
  doc.text("Certificate Number", 150, 16);
  doc.rect(180, 12, 20, 8); // Certificate number box
  doc.text(data.certificateNumber || "", 182, 18);

  // --- CONSIGNMENT DETAILS BOX ---
  doc.setFont(undefined, "bold");
  doc.text("Consignment Details", 12, 28);
  doc.setFontSize(8).setFont(undefined, "normal");
  doc.text("(Please print)", 50, 28);

  // Consignor/Consignee boxes
  doc.setLineWidth(0.2);
  doc.rect(12, 30, 90, 18); // Consignor
  doc.rect(102, 30, 98, 18); // Consignee

  doc.setFont(undefined, "bold");
  doc.text("Consignor", 14, 34);
  doc.text("Consignee", 104, 34);
  doc.setFont(undefined, "normal");
  doc.text("Name", 14, 39);
  doc.text(data.consignorName || "", 30, 39);
  doc.text("Address", 14, 44);
  doc.text(data.consignorAddress || "", 30, 44);

  doc.text("Name", 104, 39);
  doc.text(data.consigneeName || "", 120, 39);
  doc.text("Address", 104, 44);
  doc.text(data.consigneeAddress || "", 120, 44);

  // --- RECONSIGNED TO & TRANSPORT ---
  doc.rect(12, 48, 90, 16); // Reconsigned To
  doc.rect(102, 48, 98, 16); // Method of Transport

  doc.setFont(undefined, "bold");
  doc.text("Reconsigned To", 14, 52);
  doc.text("Method of Transport", 104, 52);
  doc.setFont(undefined, "normal");
  doc.text("Name", 14, 57);
  doc.text("Address", 14, 62);

  // Transport checkboxes
  const boxY = 56;
  doc.rect(104, boxY, 4, 4); // Road
  doc.text("Road", 110, boxY + 3);
  if (data.transportMethod === "road") doc.text("X", 105, boxY + 3);
  doc.text("Truck/Trailer Reg.", 130, boxY + 3);
  doc.text(data.transportDetails || "", 160, boxY + 3);

  doc.rect(104, boxY + 6, 4, 4); // Rail
  doc.text("Rail", 110, boxY + 9);
  doc.rect(140, boxY + 6, 4, 4); // Air
  doc.text("Air", 146, boxY + 9);
  doc.rect(170, boxY + 6, 4, 4); // Sea
  doc.text("Sea", 176, boxY + 9);

  if (data.transportMethod === "rail") doc.text("X", 105, boxY + 9);
  if (data.transportMethod === "air") doc.text("X", 141, boxY + 9);
  if (data.transportMethod === "sea") doc.text("X", 171, boxY + 9);

  // --- CERTIFICATION DETAILS ---
  doc.setFont(undefined, "bold");
  doc.text("Certification Details", 12, 68);
  doc.setFontSize(8).setFont(undefined, "normal");
  doc.text("(Please print)", 50, 68);

  // Certifier/Grower boxes
  doc.rect(12, 70, 90, 16); // Certifier
  doc.rect(102, 70, 98, 16); // Grower/Packer

  doc.setFont(undefined, "bold");
  doc.text("Accredited Certifier", 14, 74);
  doc.text("Grower or Packer", 104, 74);
  doc.setFont(undefined, "normal");
  doc.text("Name", 14, 79);
  doc.text(data.certifierName || "", 30, 79);
  doc.text("Address", 14, 84);
  doc.text(data.certifierAddress || "", 30, 84);

  doc.text("Name", 104, 79);
  doc.text(data.growerName || "", 120, 79);
  doc.text("Address", 104, 84);
  doc.text(data.growerAddress || "", 120, 84);

  // --- IP, BRAND, DATE CODE ---
  doc.rect(12, 88, 15, 8); // IP No.
  doc.rect(27, 88, 80, 8); // Brand
  doc.rect(107, 88, 93, 8); // Date Code

  doc.setFont(undefined, "bold");
  doc.text("IP No.", 14, 92);
  doc.text("Brand Name or Identifying Marks", 29, 92);
  doc.text("Date Code", 109, 92);
  doc.setFont(undefined, "normal");
  doc.text(data.ipNumber || "", 14, 96);
  doc.text(data.brandName || "", 29, 96);
  doc.text(data.dateCode || "", 109, 96);

  // --- FACILITY/PROCEDURE/EXPIRY TABLE ---
  doc.rect(12, 98, 30, 8);
  doc.rect(42, 98, 30, 8);
  doc.rect(72, 98, 35, 8);
  doc.rect(107, 98, 30, 8);
  doc.rect(137, 98, 30, 8);
  doc.rect(167, 98, 33, 8);

  doc.setFont(undefined, "bold");
  doc.text("Facility No.", 14, 102);

  doc.text("Procedure Code", 44, 102);
  doc.text("Expiry Date", 74, 102);
  doc.text("Facility No.", 109, 102);
  doc.text("Procedure Code", 139, 102);
  doc.text("Expiry Date", 169, 102);

  doc.setFont(undefined, "normal");
  doc.text(data.facilityNumber || "", 14, 106);
  doc.text(data.procedureCode || "", 44, 106);
  doc.text(data.accreditationExpiry || "", 74, 106);
  // If you have additional accreditation, fill these too:
  doc.text(data.additionalFacilityNumber || "", 109, 106);
  doc.text(data.additionalProcedureCode || "", 139, 106);
  doc.text(data.additionalAccreditationExpiry || "", 169, 106);

  // --- PRODUCE ENTRIES TABLE ---
  doc.setFont(undefined, "bold");
  doc.text("Number of Packages", 14, 114);
  doc.text("Type of Packages (e.g. trays, cartons)", 44, 114);
  doc.text("Type of Carrier of Biosecurity Matter", 109, 114);
  doc.text("Authorisation for Split Consignment", 169, 114);

  // Draw table rows for produce entries
  let produceY = 118;
  const produceEntries = Array.isArray(data["numberOfPackages[]"])
    ? data["numberOfPackages[]"].map((_, i) => ({
        number: data["numberOfPackages[]"][i],
        type: data["packageType[]"][i],
        carrier: data["carrierType[]"][i],
      }))
    : data["numberOfPackages[]"]
    ? [
        {
          number: data["numberOfPackages[]"],
          type: data["packageType[]"],
          carrier: data["carrierType[]"],
        },
      ]
    : [];

  produceEntries.forEach((entry, idx) => {
    doc.setFont(undefined, "normal");
    doc.text(entry.number || "", 14, produceY);
    doc.text(entry.type || "", 44, produceY);
    doc.text(entry.carrier || "", 109, produceY);
    // Authorisation for split consignment left blank
    produceY += 6;
  });

  // --- TREATMENT DETAILS TABLE ---
  doc.setFont(undefined, "bold");
  doc.text("Date", 14, 142);
  doc.text("Treatment", 34, 142);
  doc.text("Chemical (Active Ingredient)", 64, 142);
  doc.text("Concentration", 114, 142);
  doc.text("Duration and Temperature", 144, 142);

  // Example: One treatment row (expand as needed)
  doc.setFont(undefined, "normal");
  doc.text(data.treatmentDate || "", 14, 148);
  doc.text(data.treatmentType || "", 34, 148);
  doc.text(data.chemical || "", 64, 148);
  doc.text(data.concentration || "", 114, 148);
  doc.text(data.duration || "", 144, 148);

  // --- ADDITIONAL CERTIFICATION ---
  doc.setFont(undefined, "bold");
  doc.text("Additional Certification", 14, 170);
  doc.setFont(undefined, "normal");
  doc.text(data.additionalCertification || "", 14, 175);

  // --- DECLARATION ---
  doc.setFont(undefined, "italic");
  doc.text(
    "I, an Authorised Signatory of the accredited certifier that prepared the Carrier of Biosecurity Matter described above, hereby declare that the Carrier of",
    14,
    185,
    { maxWidth: 185 }
  );
  doc.text(
    "Biosecurity Matter have been prepared in the accredited certifier’s approved facilities in accordance with the accreditation(s) granted to the accredited",
    14,
    189,
    { maxWidth: 185 }
  );
  doc.text(
    "certifier under the Biosecurity Act 2014 and that the details shown above are true and correct in every particular.",
    14,
    193,
    { maxWidth: 185 }
  );

  // --- SIGNATORY, SIGNATURE, DATE ---
  doc.setFont(undefined, "bold");
  doc.text("Authorised Signatory’s Name", 14, 205);
  doc.text("Signature", 90, 205);
  doc.text("Date", 160, 205);

  doc.setFont(undefined, "normal");
  doc.text(data.signatoryName || "", 14, 210);
  if (signatureDataUrl) {
    doc.addImage(signatureDataUrl, "PNG", 90, 206, 40, 15);
  }
  doc.text(data.issueDate || "", 160, 210);

  // --- OPEN PDF IN NEW TAB ---
  window.open(doc.output("bloburl"), "_blank");
}