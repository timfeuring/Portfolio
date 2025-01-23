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


// DEMONSTRATOR IFRAME ===========================================================================

// document.addEventListener('DOMContentLoaded', () => {
//   const demonstratorFrame = document.getElementById('demonstrator-frame');
//   const links = document.querySelectorAll('.demonstrator a');

//   links.forEach((link) => {
//     link.addEventListener('click', (event) => {
//       event.preventDefault(); // Prevent the default link behavior
//       const targetUrl = link.getAttribute('href'); // Get the link's href
//       demonstratorFrame.src = targetUrl; // Load the target URL in the iframe
//     });
//   });
// });


// // Test für JS Testbutton auf der Acsplorer Page
// document.getElementById('test-button').addEventListener('click', function () {
//   console.log("It's working just fine");
// });




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


