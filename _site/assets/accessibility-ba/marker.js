// ANNOTATIONS TOGGLE ===========================================================================

// Get references to the iframe and overlay element
const iframe = document.getElementById("demonstrator-frame");
const overlay = document.querySelector(".overlay-dark");

// Variable to store loaded tooltip content
let tooltipContent = {};

// DOM LOAD VERSION
document.addEventListener("DOMContentLoaded", () => {
  const isIframe = window.self !== window.top;

  if (isIframe) {
    const toggleCheckbox = document.getElementById("annotations-toggle");
    if (toggleCheckbox) {
      toggleCheckbox.addEventListener("change", () => {
        const isChecked = toggleCheckbox.checked;
        const markerContainers = document.querySelectorAll(".marker-container");
        toggleMarkers(isChecked, markerContainers);
      });
    }
  }
});

// SHOWING TOOLTIPS ===========================================================================

function showTooltip(marker, content) {
  // Remove existing tooltips
  document.querySelectorAll(".tooltip").forEach((tooltip) => tooltip.remove());
  overlay.style.display = "block";

  // Create a new tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.innerHTML = typeof content === "object"
    ? `
      <button class="tooltip-close-btn" aria-label="Close tooltip">&times;</button>
      <a href="${content.link}" target="_blank" rel="noopener noreferrer" class="tooltip-criterion">${content.title}</a>
      <b>${content.changes.heading}</b><p>${content.changes.text}</p>
      <b>${content.reason.heading}</b><p>${content.reason.text}</p>`
    : `
      <button class="tooltip-close-btn" aria-label="Close tooltip">&times;</button>
      <p>${content}</p>`;

  // Append the tooltip and add close functionality
  marker.appendChild(tooltip);
  tooltip.querySelector(".tooltip-close-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    tooltip.remove();
    overlay.style.display = "none";
  });
}

// Add tooltip functionality
function setupTooltipForMarkers(markerContainers) {
  markerContainers.forEach((container) => {
    container.addEventListener("click", () => {
      // Ensure tooltips only activate if the marker is visible (has the 'show-marker' class)
      if (!container.classList.contains("show-marker")) return;

      // Remove existing tooltips before toggling the current one
      document.querySelectorAll(".tooltip").forEach((tooltip) => tooltip.remove());
      overlay.style.display = "block";

      const markerId = container.getAttribute("id");
      const content = tooltipContent[markerId] || "No content available for this marker.";
      showTooltip(container, content);
    });
  });
}

// Add tooltip functionality for markers on the page
function setupTooltipForPageMarkers() {
  const markerContainers = document.querySelectorAll(".marker-container");
  setupTooltipForMarkers(markerContainers);
}

// Add tooltip functionality for markers inside the iframe
function setupTooltipForIframeMarkers() {
  const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;
  if (!iframeDocument) {
    console.error("Unable to access iframe content. Ensure it is from the same origin.");
    return;
  }
  const iframeMarkerContainers = iframeDocument.querySelectorAll(".marker-container");
  setupTooltipForMarkers(iframeMarkerContainers);
}

// Load the marker content from the JSON file
fetch("assets/accessibility-ba/tooltips.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then((data) => {
    tooltipContent = data; // Store the loaded content
    setupTooltipForPageMarkers(); // Initialize tooltips after content is loaded
  })
  .catch((error) => console.error("Error loading tooltip content:", error));

// Helper function to toggle marker visibility
function toggleMarkers(checked, markerContainers) {
  markerContainers.forEach((container) => {
    container.classList.toggle("show-marker", checked);
  });
}
