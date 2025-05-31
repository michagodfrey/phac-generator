// scripts/test_data.js

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
      const produceContainer = document.getElementById("produceEntries");
      const newSet = document.createElement("div");
      newSet.classList.add("produce-set", "consignment-group");
      newSet.innerHTML = `
        <div class="form-grid">
          <div class="input-group">
            <label class="input-label">Number of Packages</label>
            <input type="number" name="numberOfPackages[]" value="100" required />
          </div>
          <div class="input-group">
            <label class="input-label">Package Type</label>
            <input type="text" name="packageType[]" value="Trays" required />
          </div>
          <div class="input-group">
            <label class="input-label">Carrier Type</label>
            <input type="text" name="carrierType[]" value="Nursery Stock" required />
          </div>
        </div>
        <button type="button" class="remove-produce">Remove Entry</button>
      `;
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
