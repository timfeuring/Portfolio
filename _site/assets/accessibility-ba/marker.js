// ANNOTATIONS TOGGLE ===========================================================================

// Get references to the iframe and overlay element
const iframe = document.getElementById("demonstrator-frame");
const overlay = document.querySelector(".overlay-dark");
const demonstratorContainer = document.querySelector(".site-demonstrator");

// Variable to store loaded tooltip content
let tooltipContent = {};

// Helper functions for overlay and tooltips
function setOverlayVisibility(visible) {
  overlay.style.display = visible ? "block" : "none";
}

function closeAllTooltips() {
  document.querySelectorAll(".tooltip").forEach((tooltip) => tooltip.remove());
}


// DOM LOAD VERSION
document.addEventListener("DOMContentLoaded", () => {
  const isIframe = window.self !== window.top;

  if (isIframe) {
    const toggleCheckbox = document.getElementById("annotations-toggle");
    if (toggleCheckbox) {
      toggleCheckbox.addEventListener("change", () => {
        const isChecked = toggleCheckbox.checked;
        updateMarkerVisibility(isChecked);
      });
    }

    // Listen for WCAG level changes from the main page
    window.addEventListener("message", (event) => {
      if (event.data?.wcagLevel) {
        updateMarkerVisibility(toggleCheckbox.checked, event.data.wcagLevel);
      }
    });
  }
});

// HELPER FUNCTION: Toggle marker visibility based on WCAG level and checkbox
function updateMarkerVisibility(checked, wcagLevel = document.body.getAttribute("data-wcag")) {
  const markers = document.querySelectorAll("[data-marker]");

  markers.forEach((marker) => {
    const markerLevel = marker.getAttribute("data-wcag");

    if (checked && markerLevel === wcagLevel) {
      marker.classList.add("show-marker"); // Show if level matches and checkbox is checked
    } else {
      marker.classList.remove("show-marker"); // Hide otherwise
    }
  });
}







// Add tooltip functionality
function setupTooltipForMarkers(markers) {
  markers.forEach((marker) => {
    marker.addEventListener("click", () => {
      if (!marker.classList.contains("show-marker")) return;

      closeAllTooltips();
      setOverlayVisibility(true);
      disableScrolling();

      const markerId = marker.getAttribute("id");
      const content = tooltipContent[markerId] || "No content available for this marker.";
      showTooltip(marker, content);

      // ✅ Send message to parent page to minimize settings panel
      window.parent.postMessage({ action: "minimizeSettingsPanel" }, "*");
    });
  });
}


// Add tooltip functionality for markers on the page
function setupTooltipForPageMarkers() {
  const markers = document.querySelectorAll("[data-marker]");
  setupTooltipForMarkers(markers);
}

// Add tooltip functionality for markers inside the iframe
function setupTooltipForIframeMarkers() {
  const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;
  if (!iframeDocument) {
    console.error("Unable to access iframe content. Ensure it is from the same origin.");
    return;
  }
  const iframeMarkers = iframeDocument.querySelectorAll("[data-marker]");
  setupTooltipForMarkers(iframeMarkers);
}

// Load the marker content from the JSON file
fetch("assets/accessibility-ba/tooltips.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then((data) => {
    tooltipContent = data;
    setupTooltipForPageMarkers();
  })
  .catch((error) => console.error("Error loading tooltip content:", error));





// Disable and enable scrolling
function disableScrolling() {
  demonstratorContainer.style.overflowY = "hidden"; // Disable vertical scrolling
  document.body.style.overflowY = "hidden"; // Fallback for entire page
}

function enableScrolling() {
  demonstratorContainer.style.overflowY = ""; // Reset to default CSS value
  document.body.style.overflowY = ""; // Reset page overflow
}

// Show tooltip function
function showTooltip(marker, content) {
  closeAllTooltips();
  setOverlayVisibility(true);
  disableScrolling();

  const visibleMarkers = [...document.querySelectorAll("[data-marker].show-marker")];
  const currentIndex = visibleMarkers.indexOf(marker);

  // Create tooltip element
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.setAttribute("role", "dialog");
  tooltip.setAttribute("aria-labelledby", "tooltip-title");
  tooltip.setAttribute("aria-describedby", "tooltip-content");

  tooltip.innerHTML = typeof content === "object"
    ? `
      <div class="tooltip-info-top"> 
        <button class="tooltip-close-btn tooltip-interaction" aria-label="Close tooltip">
          <svg class="tooltip-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#000000"/>
          </svg>
        </button>
        <div class="tooltip-info-top-firstelement">
          <h2 class="tooltip-title">${content.changes.heading}</h2>
          <p class="tooltip-content">${content.changes.text}</p>
        </div>
        <div>
          <h3 class="tooltip-title">${content.reason.heading}</h3>
          <p class="tooltip-content">${content.reason.text}</p>
        </div>
      </div>
      <div class="tooltip-info-bottom"> 
        <a href="${content.link}" target="_blank" rel="noopener noreferrer" class="tooltip-interaction tooltip-link">${content.title}</a>
        <nav class="tooltip-nav">
          <button class="tooltip-prev-btn tooltip-interaction" ${currentIndex === 0 ? "disabled" : ""}>◀ previous</button>
          <button class="tooltip-next-btn tooltip-interaction" ${currentIndex === visibleMarkers.length - 1 ? "disabled" : ""}>next ▶</button>
        </nav>
      </div>
    `
    : `<button class="tooltip-close-btn tooltip-interaction" aria-label="Close tooltip">✖</button>
       <p id="tooltip-content">${content}</p>`;

  document.body.appendChild(tooltip);

  // Positioning
  const markerRect = marker.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Center horizontally
  let left = Math.max(10, (viewportWidth - tooltipRect.width) / 2);

  // Default: Tooltip appears **24px below** the marker
  let top = markerRect.top + window.scrollY + markerRect.height + 24;

  // Ensure tooltip stays inside viewport
  if (top + tooltipRect.height > viewportHeight + window.scrollY) {
    top = markerRect.top + window.scrollY - tooltipRect.height - 24;
  }

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  tooltip.style.transform = "translateX(0)"; // Ensure it's not shifted

  // Close tooltip button
  tooltip.querySelector(".tooltip-close-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllTooltips();
    setOverlayVisibility(false);
    enableScrolling(); // ✅ Re-enable scrolling when tooltip closes
  });

  // Previous Button Click
  const prevButton = tooltip.querySelector(".tooltip-prev-btn");
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        navigateToTooltip(visibleMarkers[currentIndex - 1]);
      }
    });
  }

  // Next Button Click
  const nextButton = tooltip.querySelector(".tooltip-next-btn");
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (currentIndex < visibleMarkers.length - 1) {
        navigateToTooltip(visibleMarkers[currentIndex + 1]);
      }
    });
  }
}

  
  
  
  






// Navigate to next or previous tooltip without closing overlay
function navigateToTooltip(marker) {
  closeAllTooltips();
  
  // Get marker position
  const markerRect = marker.getBoundingClientRect();
  const offsetPosition = markerRect.top + window.scrollY - 40; // Add 40px padding
  
  // Smooth scroll with padding
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });

  setTimeout(() => marker.click(), 250);
}




// Global Tooltip Container Behavior
const annotationsToggle = document.getElementById("annotations-toggle");
const tooltipContainer = document.querySelector(".global-tooltip-container");

annotationsToggle.addEventListener("change", () => {
  if (annotationsToggle.checked) {
    tooltipContainer.classList.add("show-annotations");
  } else {
    tooltipContainer.classList.remove("show-annotations");
  }
});

// EXPAND GLOBAL TOOLTIP
document.querySelectorAll('.tooltip-action-btn').forEach(button => {
  button.addEventListener('click', () => {
    const globalTooltip = button.closest('.global-tooltip, .global-tooltip-expanded');

    if (globalTooltip) {
      const isAlreadyExpanded = globalTooltip.classList.contains('global-tooltip-expanded');

      // Close all tooltips first
      document.querySelectorAll('.global-tooltip-expanded').forEach(expandedTooltip => {
        expandedTooltip.classList.remove('global-tooltip-expanded');
        expandedTooltip.classList.add('global-tooltip');
      });

      // If the clicked tooltip was not already expanded, expand it
      if (!isAlreadyExpanded) {
        globalTooltip.classList.remove('global-tooltip');
        globalTooltip.classList.add('global-tooltip-expanded');
      }
    }
  });
});


// Function to reset expanded tooltips when WCAG level changes
function resetExpandedTooltips() {
  document.querySelectorAll(".global-tooltip-expanded").forEach((tooltip) => {
    tooltip.classList.remove("global-tooltip-expanded");
    tooltip.classList.add("global-tooltip");
  });
}

// MutationObserver to detect changes in the data-wcag attribute
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "data-wcag") {
      resetExpandedTooltips(); // Reset expanded tooltips when data-wcag changes
    }
  });
});

// Start observing changes on the body (or another relevant parent element)
const targetNode = document.body; // Adjust if needed
observer.observe(targetNode, { attributes: true, attributeFilter: ["data-wcag"] });








// Function to simulate clicking all .tooltip-close-btn buttons
function closeTooltipsOnWCAGChange() {
  document.querySelectorAll(".tooltip-close-btn").forEach((btn) => {
    btn.click(); // Simulate a click on each close button
  });
}

// MutationObserver to detect changes in the data-wcag attribute
const wcagObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "data-wcag") {
      closeTooltipsOnWCAGChange(); // Simulate closing all tooltips
    }
  });
});

// Start observing changes (targetNode is already defined in your script)
wcagObserver.observe(targetNode, { attributes: true, attributeFilter: ["data-wcag"] });


// Make the whole .global-tooltip-header trigger the .tooltip-action-btn click
document.querySelectorAll('.global-tooltip-header').forEach(header => {
  header.addEventListener('click', (event) => {
    // Prevent triggering if clicking on an existing button inside the header
    if (!event.target.closest('.tooltip-action-btn')) {
      const actionButton = header.querySelector('.tooltip-action-btn');
      if (actionButton) {
        actionButton.click(); // Simulate button click
      }
    }
  });
});
