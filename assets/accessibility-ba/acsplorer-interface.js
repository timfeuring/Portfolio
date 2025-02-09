// Get references to the Acsplorer checkbox and iframe
const acsplorerCheckbox = document.getElementById("iframe-annotations-toggle");
const iframe = document.getElementById("demonstrator-frame");

// Ensure the iframe has loaded before trying to interact with its contents
iframe.addEventListener("load", () => {
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  const iframeCheckbox = iframeDocument?.getElementById("annotations-toggle");

  if (!iframeCheckbox) {
    console.error("Iframe annotations-toggle checkbox not found.");
    return;
  }

  // Sync the iframe checkbox with the Acsplorer checkbox
  acsplorerCheckbox.addEventListener("change", () => {
    const isChecked = acsplorerCheckbox.checked;
    iframeCheckbox.checked = isChecked;

    // Trigger the 'change' event on the iframe checkbox to ensure functionality
    iframeCheckbox.dispatchEvent(new Event("change", { bubbles: true }));
  });
});



function resetAnnotations() {
  // Access the iframe and its document
  const iframe = document.getElementById("demonstrator-frame");
  const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;

  // Close all tooltips in the parent document
  document.querySelectorAll(".tooltip-close-btn").forEach((btn) => btn.click());

  // Close tooltips inside the iframe
  const iframeCloseButtons = iframeDocument?.querySelectorAll(".tooltip-close-btn") || [];
  iframeCloseButtons.forEach((btn) => btn.click());

  // Hide the overlay inside the iframe
  const overlay = iframeDocument?.querySelector(".overlay-dark");
  if (overlay) {
    overlay.style.display = "none";
  }

  // Hide markers inside the iframe
  const markers = iframeDocument?.querySelectorAll("[data-marker]") || [];
  markers.forEach((marker) => marker.classList.remove("show-marker"));

  // Reset the annotations toggle
  const annotationsToggle = document.getElementById("iframe-annotations-toggle");
  if (annotationsToggle.checked) {
    annotationsToggle.click(); // Simulate click to trigger behavior
  }

  // Ensure toggle is visually reset
  annotationsToggle.checked = false;
  annotationsToggle.disabled = true;

  // Update toggle status text
  const toggleStatusText = document.querySelector(".toggle-status-text");
  if (toggleStatusText) {
    toggleStatusText.textContent = "OFF";
  }
}





// WCAG SELECTION
function updateSelection(level) {
  const checkboxes = {
    none: document.getElementById("none"),
    a: document.getElementById("a"),
    aa: document.getElementById("aa"),
    aaa: document.getElementById("aaa"),
  };

  const criteriaInfo = document.getElementById("criteria-info");
  const annotationsToggle = document.getElementById("iframe-annotations-toggle");

  // Reset all checkboxes
  Object.values(checkboxes).forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.setAttribute("data-state", "unselected");
    const label = checkbox.parentElement;
    const icon = label.querySelector(".icon");
    icon.className = "icon icon-empty";
    label.className = "wcag-selection-unselected";
  });

  // Update the selected checkbox and criteria info
  switch (level) {
    case "none":
      checkboxes.none.checked = true;
      checkboxes.none.setAttribute("data-state", "selected");
      criteriaInfo.textContent = `0 criteria applied`;

      // Reset annotations when "none" is selected
      resetAnnotations();
      break;

    case "a":
      checkboxes.a.checked = true;
      checkboxes.a.setAttribute("data-state", "selected");
      criteriaInfo.textContent = `✓ 27/30 criteria applied`;
      annotationsToggle.disabled = false;
      break;

    case "aa":
      checkboxes.a.checked = true;
      checkboxes.a.setAttribute("data-state", "checked");
      checkboxes.aa.checked = true;
      checkboxes.aa.setAttribute("data-state", "selected");
      criteriaInfo.textContent = `✓ 45/50 criteria applied`;
      annotationsToggle.disabled = false;
      break;

    case "aaa":
      checkboxes.a.checked = true;
      checkboxes.a.setAttribute("data-state", "checked");
      checkboxes.aa.checked = true;
      checkboxes.aa.setAttribute("data-state", "checked");
      checkboxes.aaa.checked = true;
      checkboxes.aaa.setAttribute("data-state", "selected");
      criteriaInfo.textContent = `✓ 69/78 criteria applied`;
      annotationsToggle.disabled = false;
      break;
  }

  // Update icons and label classes based on the new state
  updateIconsAndLabels();
}

// Function to update icons and labels based on data-state
function updateIconsAndLabels() {
  document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    const label = checkbox.parentElement;
    const icon = label.querySelector(".icon");
    const state = checkbox.getAttribute("data-state");

    if (state === "selected") {
      icon.className = "icon icon-filled";
      label.className = "wcag-selection-selected";
    } else if (state === "checked") {
      icon.className = "icon icon-checked";
      label.className = "wcag-selection-selected";
    } else {
      icon.className = "icon icon-empty";
      label.className = "wcag-selection-unselected";
    }
  });
}

// Initialize the page with correct states on load
document.addEventListener("DOMContentLoaded", updateIconsAndLabels);

// Handle keyboard interactions
function handleKeydown(event, level) {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    updateSelection(level);
  }
}

// Send WCAG level to the iframe
function updateIframeWCAGSelection(selectedLevel) {
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({ wcagLevel: selectedLevel }, "*");
  }
}

// Event listener for WCAG level clicks in settings panel
document.addEventListener("click", (event) => {
  const label = event.target.closest("label[id^='label-']");
  if (label) {
    const selectedLevel = label.id.replace("label-", ""); // Extract level from ID
    updateIframeWCAGSelection(selectedLevel);
  }
});

// Handle annotations toggle
document.addEventListener("DOMContentLoaded", () => {
  const wcagSelection = document.querySelector(".wcag-selection-form");
  const toggleInput = document.getElementById("iframe-annotations-toggle");
  const toggleLabel = document.querySelector(".annotations-toggle");
  const toggleStatusText = document.querySelector(".toggle-status-text");

  // Ensure the toggle starts disabled if "none" is selected
  function updateToggleState() {
    const selectedLevel = document.querySelector("input#none").checked ? "none" : "";
    const isNoneSelected = selectedLevel === "none";

    toggleInput.disabled = isNoneSelected;
    toggleLabel.classList.toggle("disabled", isNoneSelected);

    // Reset toggle to OFF when "none" is selected
    if (isNoneSelected) {
      toggleInput.checked = false;
      toggleStatusText.textContent = "OFF";
      resetAnnotations();
    }
  }

  // Initialize toggle state on page load
  updateToggleState();

  // Listen for WCAG level changes
  wcagSelection.addEventListener("click", (event) => {
    const selectedLabel = event.target.closest("label[id^='label-']");
    if (!selectedLabel) return;

    updateToggleState();
  });

  // Change status text dynamically on toggle change
  toggleInput.addEventListener("change", () => {
    toggleStatusText.textContent = toggleInput.checked ? "ON" : "OFF";
  });
});

// RESIZE PANEL BUTTON
document.addEventListener("DOMContentLoaded", () => {
  const resizeButton = document.getElementById("resize");
  const settingsPanel = document.querySelector(".settings-panel");
  const icon = resizeButton.querySelector(".icon-40");

  resizeButton.addEventListener("click", () => {
    settingsPanel.classList.toggle("position-minimized");
    icon.classList.toggle("rotate-180");
  });
});



// MINIMIZED POSITION SETTINGS PANEL

document.addEventListener("DOMContentLoaded", function () {
  const settingsPanel = document.querySelector(".settings-panel");

  function updateMinimizedPosition() {
    const panelHeight = settingsPanel.offsetHeight;
    const minimizedValue = -panelHeight + 60; // Ensures 40px stays visible

    // Update the CSS rule for .minimized
    document.styleSheets[0].insertRule(
      `.settings-panel.position-minimized { bottom: ${minimizedValue}px}`,
      document.styleSheets[0].cssRules.length
    );
  }

  // Run on load & resize
  updateMinimizedPosition();
  window.addEventListener("resize", updateMinimizedPosition);
});



// MINIMIZE SETTINGS PANEL WHEN CLICKING MARKER

window.addEventListener("message", (event) => {
  // Check if message is coming from the iframe
  if (event.data?.action === "minimizeSettingsPanel") {
    const settingsPanel = document.querySelector(".settings-panel");
    const resizeButton = document.getElementById("resize");

    // ✅ Only simulate click if the panel is NOT already minimized
    if (settingsPanel && !settingsPanel.classList.contains("position-minimized")) {
      resizeButton.click(); // Simulate a click on the resize button
    }
  }
});
