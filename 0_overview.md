# Product Requirements Document: PHAC Generator Demo App

## 1. Purpose

To demonstrate a modern alternative to the current carbon-copy Plant Health Assurance Certificate (PHAC) system used under the Interstate Certification Assurance (ICA) scheme. The app will allow users to enter PHAC data through a form and generate a PDF certificate with a unique serial number, ready to print or email.

---

## 2. Users

* **Primary**: Nursery and horticulture businesses with ICA accreditation.
* **Secondary**: Biosecurity officers and policymakers evaluating improvements to current processes.

---

## 3. Features

**MVP Features:**

* Web form with fields matching the PHAC \[CAF-16] requirements:

  * Consignment details (consignor, consignee, transport method, etc.)
  * Certification details (accredited certifier, grower, IP number, etc.)
  * Treatment/condition and additional certification statements
  * Declaration (signature field, date)
* Automatically generate a unique certificate number based on the business' IP number, which will be a Q followed by 4 digits, e.g. Q1234 plus an incremental counter.
* PDF generation and download/export (styled to look like a real PHAC)
* Signature capture using an online signing popup (e.g., canvas-based input or signature pad plugin)
* Simple persistence for commonly reused data like business address, IP number, and ICA arrangement (e.g., ICA-29, ICA-39), even without login — using localStorage or indexedDB

**Stretch Features:**

* Print-friendly format
* Option to save or email the certificate
* Light theming to mimic official forms
* Admin panel to see history (demo only)

---

## 4. Non-Functional Requirements

* Works offline (if using localStorage or in-browser PDF generation)
* Mobile and desktop friendly
* Clear layout and error handling
* No user login required for MVP

---

## 5. Tech Stack (Suggested)

* **Frontend**: HTML + TailwindCSS + JavaScript
* **PDF Generation**: `jsPDF` or `pdf-lib`
* **Unique ID**: Certificate ID based on IP format (Q####-###) with counter stored in browser
* **Persistence**: localStorage or indexedDB for reusable form data

---

## 6. Out of Scope

* Official endorsement or integration with state systems
* Full ICA certificate issuing system
* Dynamic pest/condition checks (future potential)

---

## 7. Success Criteria

* Can complete a PHAC via the web form and generate a correctly formatted PDF
* Unique certificate number assigned per submission
* Visual and practical improvements over current carbon-book method are obvious and demonstrable to stakeholders
