

// SEARCH REDIRECT TO 404 PAGE ===========================================================================
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form's default submission
  window.location.href = "accessibility-ba-404.html"; // Redirect inside the iframe
});

// BURGER MENU ===========================================================================
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const navbarList = document.querySelector(".navbar-list");

  burgerMenu.addEventListener("click", function () {
    const isExpanded = burgerMenu.getAttribute("aria-expanded") === "true";
    burgerMenu.setAttribute("aria-expanded", !isExpanded);
    navbarList.classList.toggle("active");
  });
});


// GALLERY ===========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "assets/accessibility-ba/img/gallery/gallery-img-01.png",
    "assets/accessibility-ba/img/gallery/gallery-img-02.png",
    "assets/accessibility-ba/img/gallery/gallery-img-03.png",
    "assets/accessibility-ba/img/gallery/gallery-img-04.png",
    "assets/accessibility-ba/img/gallery/gallery-img-05.png"
  ];

  const galleryImage = document.getElementById("gallery-image");
  const currentImageIndicator = document.getElementById("current-image");
  let currentIndex = 0;

  // Set up images dynamically
  const placeholder = document.querySelector(".recipe-image-placeholder");
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Recipe image ${index + 1}`;
    img.className = index === 0 ? "active" : "";
    placeholder.appendChild(img);
  });

  const updateGallery = () => {
    const allImages = placeholder.querySelectorAll("img");
    allImages.forEach((img, index) => {
      img.classList.toggle("active", index === currentIndex);
    });
    currentImageIndicator.textContent = currentIndex + 1;
  };

  document.querySelector(".next-btn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  });

  document.querySelector(".prev-btn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  });

  updateGallery(); // Initialize the gallery
});


// INGREDIENTS ===========================================================================

document.addEventListener("DOMContentLoaded", function () {
  const servingsInput = document.getElementById("servings");
  const increaseButton = document.getElementById("increase-servings");
  const decreaseButton = document.getElementById("decrease-servings");
  const updateButton = document.getElementById("update-list");
  const servingQuantity = document.getElementById("serving-quantity");

  // Update servings based on button clicks
  increaseButton.addEventListener("click", () => {
    servingsInput.value = parseInt(servingsInput.value) + 1;
    updateServingText();
  });

  decreaseButton.addEventListener("click", () => {
    if (parseInt(servingsInput.value) > 1) {
      servingsInput.value = parseInt(servingsInput.value) - 1;
      updateServingText();
    }
  });

  // Update serving text
  function updateServingText() {
    servingQuantity.textContent = servingsInput.value;
  }

  // Update list action
  updateButton.addEventListener("click", () => {
    alert(`Ingredient list updated for ${servingsInput.value} servings.`);
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const wcagSelector = document.querySelector(".wcag-selector");
  const pageContainer = document.body; // or your main container element

  wcagSelector.addEventListener("change", (event) => {
    const selectedLevel = event.target.value;
    pageContainer.setAttribute("data-wcag", selectedLevel);

    console.log(`WCAG Level switched to: ${selectedLevel}`);
  });
});







