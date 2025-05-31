// scripts/pdf_generation.js

// PDF Generation
document.getElementById("generatePDFBtn").addEventListener("click", (e) => {
  e.preventDefault();
  generatePDF();
});

function generatePDF() {
  const form = document.getElementById("phacForm");
  const formData = new FormData(form);
  const data = {};

  // Debug logging for raw form data
  console.log("Raw Form Data:");
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // Process form data
  for (let [key, value] of formData.entries()) {
    if (data[key]) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  }

  // Debug logging for processed data
  console.log("Processed Form Data:", data);
  console.log(
    "Additional Facility Numbers:",
    data["additionalFacilityNumber[]"]
  );
  console.log("Additional Procedure Codes:", data["additionalProcedureCode[]"]);
  console.log(
    "Additional Accreditation Expiries:",
    data["additionalAccreditationExpiry[]"]
  );

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let signatureDataUrl = "";
  if (window.signaturePadInstance && !window.signaturePadInstance.isEmpty()) {
    signatureDataUrl = window.signaturePadInstance.toDataURL();
  }
  if (signatureDataUrl) {
    doc.addImage(signatureDataUrl, "PNG", 90, 206, 40, 15);
  }

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
  // Get all facility data
  const initialFacilityNumber = data.facilityNumber || "";
  const initialProcedureCode = data.procedureCode || "";
  const initialAccreditationExpiry = data.accreditationExpiry || "";
  const additionalFacilityNumbers = data["additionalFacilityNumber[]"] || [];
  const additionalProcedureCodes = data["additionalProcedureCode[]"] || [];
  const additionalAccreditationExpiries =
    data["additionalAccreditationExpiry[]"] || [];

  // First row of facility data (initial facility)
  doc.text(initialFacilityNumber, 14, 106);
  doc.text(initialProcedureCode, 44, 106);
  doc.text(initialAccreditationExpiry, 74, 106);

  // Second row of facility data (additional facility)
  // Since we're getting single values, we don't need to check for array
  doc.text(additionalFacilityNumbers || "", 109, 106);
  doc.text(additionalProcedureCodes || "", 139, 106);
  doc.text(additionalAccreditationExpiries || "", 169, 106);

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
    "Biosecurity Matter have been prepared in the accredited certifier's approved facilities in accordance with the accreditation(s) granted to the accredited",
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
  doc.text("Authorised Signatory's Name", 14, 205);
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
