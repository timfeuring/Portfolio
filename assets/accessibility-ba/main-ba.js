// ANNOTATIONS TOGGLE ===========================================================================

// Get references to the checkbox and the iframe
const toggleCheckbox = document.getElementById("annotations-toggle");
const iframe = document.getElementById("demonstrator-frame");

// Function to toggle markers in the main page
function toggleMarkersOnPage(checked) {
  const markers = document.querySelectorAll(".marker");
  markers.forEach((marker) => {
    marker.style.display = checked ? "block" : "none";
  });
}

// Function to toggle markers inside the iframe
function toggleMarkersInIframe(checked) {
  // Ensure the iframe is loaded before trying to access its content
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  if (!iframeDocument) {
    console.error("Unable to access iframe content. Ensure it is from the same origin.");
    return;
  }

  // Query all markers inside the iframe
  const iframeMarkers = iframeDocument.querySelectorAll(".marker");
  iframeMarkers.forEach((marker) => {
    marker.style.display = checked ? "block" : "none";
  });
}

// Add an event listener to the checkbox
toggleCheckbox.addEventListener("change", () => {
  const isChecked = toggleCheckbox.checked;

  // Toggle markers on the main page
  toggleMarkersOnPage(isChecked);

  // Toggle markers in the iframe
  toggleMarkersInIframe(isChecked);
});

// Optional: Ensure the iframe markers are updated if the iframe is dynamically loaded
iframe.addEventListener("load", () => {
  toggleMarkersInIframe(toggleCheckbox.checked); // Sync iframe markers with the checkbox state
  setupBreadcrumbMarkerListener(); // Add click event listener for breadcrumb-marker
});









// LOGGING TO CONSOLE – WORKING FOR ACSPLORER, INCLUDING IFRAME ===========================================================================

// Get reference to the test-marker element in the parent page
const testMarker = document.getElementById("test-marker");

// Add click event listener to test-marker
if (testMarker) {
  testMarker.addEventListener("click", () => {
    console.log("Hurray, the test marker works!");
  });
} else {
  console.error('Element with id "test-marker" not found.');
}

// Function to set up click event listener for breadcrumb-marker inside the iframe
function setupBreadcrumbMarkerListener() {
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  if (!iframeDocument) {
    console.error("Unable to access iframe content. Ensure it is from the same origin.");
    return;
  }

  const breadcrumbMarker = iframeDocument.getElementById("breadcrumb-marker");

  if (breadcrumbMarker) {
    breadcrumbMarker.addEventListener("click", () => {
      console.log("Hurray, the breadcrumb marker works!");
    });
  } else {
    console.error('Element with id "breadcrumb-marker" not found in iframe.');
  }
}



// TOOLTIP CONTENT MAPPING ===========================================================================

const tooltipContent = {
  1: `<p>This is the content for marker 1. It provides details for marker 1.</p>`,
  2: `<p>This is the content for marker 2. Additional info goes here.</p>`,
  3: `<p>This is the content for marker 3. Include multi-line paragraphs as needed.</p>`,
  4: `<p>This is the content for marker 4. Tooltip supports rich HTML content!</p>`,
  5: `<p>This is the content for marker 5. Add images, links, or other HTML elements as well.</p>`
};

// SHOWING TOOLTIPS ===========================================================================

// Function to create and display a tooltip
function showTooltip(marker, content) {
  // Remove any existing tooltips
  const existingTooltip = document.querySelector(".tooltip");
  if (existingTooltip) existingTooltip.remove();

  // Create a new tooltip element
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip", "tooltip-bottom-left"); // Add positioning class

  // Set the inner HTML to the provided content
  tooltip.innerHTML = content;

  // Append the tooltip to the document
  document.body.appendChild(tooltip);
}

// Add tooltip functionality for markers on the Acsplorer page
function setupTooltipForPageMarkers() {
  const markers = document.querySelectorAll(".marker");
  markers.forEach((marker) => {
    marker.addEventListener("click", () => {
      const markerId = marker.getAttribute("id"); // Get the marker's ID
      const content =
        tooltipContent[markerId] || "<p>No content available for this marker.</p>"; // Fetch content or fallback
      showTooltip(marker, content); // Show the tooltip
    });
  });
}

// Add tooltip functionality for the breadcrumb marker inside the iframe
function setupTooltipForIframeMarkers() {
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  if (!iframeDocument) {
    console.error("Unable to access iframe content. Ensure it is from the same origin.");
    return;
  }

  const iframeMarkers = iframeDocument.querySelectorAll(".marker");
  iframeMarkers.forEach((marker) => {
    marker.addEventListener("click", () => {
      const markerId = marker.getAttribute("id"); // Get the marker's ID
      const content =
        tooltipContent[markerId] || "<p>No content available for this marker.</p>"; // Fetch content or fallback
      showTooltip(marker, content); // Show the tooltip
    });
  });
}

// Ensure tooltips are set up when the iframe loads
iframe.addEventListener("load", () => {
  setupTooltipForIframeMarkers(); // Add tooltip functionality for markers in the iframe
});

// Initial setup for Acsplorer page
setupTooltipForPageMarkers();






// CONSOLE LOG – JS TEST BUTTON ===========================================================================
document.querySelectorAll('.test-button').forEach(button => {
  button.addEventListener('click', function () {
    console.log("It's working");
  });
});


// // SEARCH REDIRECT TO 404 PAGE ===========================================================================
// document.getElementById('search-form').addEventListener('submit', function (event) {
//   event.preventDefault(); // Prevent the form's default submission
//   window.location.href = "accessibility-ba-404.html"; // Redirect inside the iframe
// });


// // BURGER MENU ===========================================================================
// document.addEventListener("DOMContentLoaded", function () {
//   const burgerMenu = document.querySelector(".burger-menu");
//   const navbarList = document.querySelector(".navbar-list");

//   burgerMenu.addEventListener("click", function () {
//     const isExpanded = burgerMenu.getAttribute("aria-expanded") === "true";
//     burgerMenu.setAttribute("aria-expanded", !isExpanded);
//     navbarList.classList.toggle("active");
//   });
// });



// // GALLERY ===========================================================================

// document.addEventListener("DOMContentLoaded", () => {
//   const images = [
//     "assets/accessibility-ba/img/gallery/gallery-img-01.png",
//     "assets/accessibility-ba/img/gallery/gallery-img-02.png",
//     "assets/accessibility-ba/img/gallery/gallery-img-03.png",
//     "assets/accessibility-ba/img/gallery/gallery-img-04.png",
//     "assets/accessibility-ba/img/gallery/gallery-img-05.png"
//   ];

//   const galleryImage = document.getElementById("gallery-image");
//   const currentImageIndicator = document.getElementById("current-image");
//   let currentIndex = 0;

//   // Set up images dynamically
//   const placeholder = document.querySelector(".recipe-image-placeholder");
//   images.forEach((src, index) => {
//     const img = document.createElement("img");
//     img.src = src;
//     img.alt = `Recipe image ${index + 1}`;
//     img.className = index === 0 ? "active" : "";
//     placeholder.appendChild(img);
//   });

//   const updateGallery = () => {
//     const allImages = placeholder.querySelectorAll("img");
//     allImages.forEach((img, index) => {
//       img.classList.toggle("active", index === currentIndex);
//     });
//     currentImageIndicator.textContent = currentIndex + 1;
//   };

//   document.querySelector(".next-btn").addEventListener("click", () => {
//     currentIndex = (currentIndex + 1) % images.length;
//     updateGallery();
//   });

//   document.querySelector(".prev-btn").addEventListener("click", () => {
//     currentIndex = (currentIndex - 1 + images.length) % images.length;
//     updateGallery();
//   });

//   updateGallery(); // Initialize the gallery
// });

// // INGREDIENTS ===========================================================================

// document.addEventListener("DOMContentLoaded", function () {
//   const servingsInput = document.getElementById("servings");
//   const increaseButton = document.getElementById("increase-servings");
//   const decreaseButton = document.getElementById("decrease-servings");
//   const updateButton = document.getElementById("update-list");
//   const servingQuantity = document.getElementById("serving-quantity");

//   // Update servings based on button clicks
//   increaseButton.addEventListener("click", () => {
//     servingsInput.value = parseInt(servingsInput.value) + 1;
//     updateServingText();
//   });

//   decreaseButton.addEventListener("click", () => {
//     if (parseInt(servingsInput.value) > 1) {
//       servingsInput.value = parseInt(servingsInput.value) - 1;
//       updateServingText();
//     }
//   });

//   // Update serving text
//   function updateServingText() {
//     servingQuantity.textContent = servingsInput.value;
//   }

//   // Update list action
//   updateButton.addEventListener("click", () => {
//     alert(`Ingredient list updated for ${servingsInput.value} servings.`);
//   });
// });



// DEMONSTRATOR IFRAME ===========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const demonstratorFrame = document.getElementById('demonstrator-frame');
  const links = document.querySelectorAll('.demonstrator a');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
      const targetUrl = link.getAttribute('href'); // Get the link's href
      demonstratorFrame.src = targetUrl; // Load the target URL in the iframe
    });
  });
});


// Test für JS Testbutton auf der Acsplorer Page
document.getElementById('test-button').addEventListener('click', function () {
  console.log("It's working just fine");
});








// OLD ===========================================================================
// ===========================================================================
// ===========================================================================


// COLOR THEME SWITCH – DON'T CHANGE
// const themeToggle = document.getElementById("theme-toggle");
// const exampleSection = document.querySelector(".acsplorer-demonstrator");

// themeToggle.addEventListener("click", () => {
//   const currentTheme = exampleSection.getAttribute("data-theme");
//   const newTheme = currentTheme === "dark" ? "light" : "dark";
//   exampleSection.setAttribute("data-theme", newTheme);
// });

// // Font Switch
// const fontToggle = document.getElementById("font-toggle");
// const fontSection = document.querySelector(".acsplorer-demonstrator");  // Use the same .acsplorer-demonstrator for font switch

// fontToggle.addEventListener("click", () => {
//   // Get current font setting
//   const currentFont = fontSection.getAttribute("data-font");

//   // Toggle between 'default' and 'dyslexia'
//   const newFont = currentFont === "default" ? "dyslexia" : "default";

//   // Apply the new font setting
//   fontSection.setAttribute("data-font", newFont);
// });

