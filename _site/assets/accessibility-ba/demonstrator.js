// UPDATE WCAG LEVEL ===========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const pageContainer = document.body;
  const wcagRadios = document.querySelectorAll(".wcag-selector input[type='radio']");

  // Function to update WCAG Level
  function updateWCAGLevel(selectedLevel) {
    pageContainer.setAttribute("data-wcag", selectedLevel);
  }

  // Ensure manual clicks work inside iframe
  wcagRadios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      updateWCAGLevel(event.target.value);
    });
  });

  // Listen for messages from the Acsplorer page
  window.addEventListener("message", (event) => {
    if (!event.data?.wcagLevel) return;

    const radioButton = document.getElementById(`demonstrator-label-${event.data.wcagLevel}`);
    if (radioButton) {
      radioButton.checked = true;
      radioButton.dispatchEvent(new Event("input", { bubbles: true }));
      radioButton.dispatchEvent(new Event("change", { bubbles: true }));

      updateWCAGLevel(event.data.wcagLevel);
    }
  });
});



// SEARCH REDIRECT TO 404 PAGE ===========================================================================
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form's default submission
  window.location.href = "accessibility-ba-404.html"; // Redirect inside the iframe
});





// BURGER MENU ===========================================================================
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const navbarList = document.querySelector(".navbar-list");
  const dropdownToggles = document.querySelectorAll(".nav-dropdown-toggle");
  const navLinks = document.querySelectorAll(".navbar-link, .dropdown-link");
  const nav = document.querySelector(".main-navigation");

  // Function to close all dropdowns
  function closeAllDropdowns() {
    dropdownToggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.nextElementSibling.hidden = true;
    });
  }

  // Function to close the entire navbar (Burger Menu)
  function closeNavbar() {
    navbarList.classList.remove("active");
    navbarList.hidden = true;
    burgerMenu.setAttribute("aria-expanded", "false");
  }

  // Burger Menu Toggle
  burgerMenu.addEventListener("click", function (event) {
    const isExpanded = burgerMenu.getAttribute("aria-expanded") === "true";
    burgerMenu.setAttribute("aria-expanded", !isExpanded);
    navbarList.classList.toggle("active");
    navbarList.hidden = isExpanded;
    event.stopPropagation(); // Prevent immediate closing
  });

  // Handle dropdown toggle clicks
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (event) {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      closeAllDropdowns(); // Close all before opening a new one

      if (!isExpanded) {
        this.setAttribute("aria-expanded", "true");
        this.nextElementSibling.hidden = false;
      } else {
        this.setAttribute("aria-expanded", "false");
        this.nextElementSibling.hidden = true;
      }

      event.stopPropagation(); // Prevent immediate closure
    });
  });

  // Close dropdowns and navbar when clicking any other link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeAllDropdowns();
      closeNavbar();
    });
  });

  // Close dropdowns and navbar when clicking anywhere outside the navigation
  document.addEventListener("click", function (event) {
    if (!nav.contains(event.target)) {
      closeAllDropdowns();
      closeNavbar();
    }
  });

  // Ensure dropdowns close when they lose focus
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("focusout", function (event) {
      setTimeout(() => {
        if (!toggle.nextElementSibling.contains(document.activeElement)) {
          closeAllDropdowns();
        }
      }, 100);
    });
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
  const paginationDots = document.querySelector(".pagination-dots");
  const placeholder = document.querySelector(".recipe-image-placeholder");
  let currentIndex = 0;

  // Set up images dynamically
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Recipe image ${index + 1}`;
    img.className = index === 0 ? "active" : "";
    placeholder.appendChild(img);

    // Create pagination dots
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active-dot");
    dot.dataset.index = index;
    paginationDots.appendChild(dot);

    // Click event for dots
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateGallery();
    });
  });

  const updateGallery = () => {
    const allImages = placeholder.querySelectorAll("img");
    const dots = paginationDots.querySelectorAll(".dot");

    allImages.forEach((img, index) => {
      img.classList.toggle("active", index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active-dot", index === currentIndex);
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

  // Swipe functionality
  let startX = 0;
  placeholder.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  placeholder.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        currentIndex = (currentIndex + 1) % images.length; // Swipe left
      } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Swipe right
      }
      updateGallery();
    }
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

// COMMENT FORM ===========================================================================
document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting automatically

  const comment = document.getElementById("comment");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const agreement = document.getElementById("agreement");

  let isValid = true;

  // Comment Validation
  if (comment.value.trim() === "") {
    document.getElementById("comment-error").hidden = false;
    isValid = false;
  } else {
    document.getElementById("comment-error").hidden = true;
  }

  // Name Validation
  if (name.value.trim() === "") {
    document.getElementById("name-error").hidden = false;
    isValid = false;
  } else {
    document.getElementById("name-error").hidden = true;
  }

  // Email Validation
  if (!email.validity.valid) {
    document.getElementById("email-error").hidden = false;
    isValid = false;
  } else {
    document.getElementById("email-error").hidden = true;
  }

  // Agreement Validation
  if (!agreement.checked) {
    document.getElementById("agreement-error").hidden = false;
    isValid = false;
  } else {
    document.getElementById("agreement-error").hidden = true;
  }

  // Form Submission (if valid)
  if (isValid) {
    alert("Comment submitted successfully!");
    this.reset();
  }
});





// MORE RECIPES ===========================================================================









// NEWSLETTER ===========================================================================
document.getElementById("newsletterForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting automatically

  const email = document.getElementById("newsletter-email");
  const consent = document.getElementById("newsletter-consent");
  const error = document.getElementById("newsletter-error");

  let isValid = true;

  // Email Validation
  if (!email.validity.valid) {
    error.hidden = false;
    isValid = false;
  } else {
    error.hidden = true;
  }

  // Consent Check (Optional)
  if (!consent.checked) {
    alert("Consider opting in to receive special offers from VegCraft!");
  }

  // Form Submission (if valid)
  if (isValid) {
    alert("Subscription successful!");
    this.reset();
  }
});



// SMOOTH SCROLLING ===========================================================================

document.querySelectorAll('a[href^=""]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});



// COMMENTS SECTION ===========================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Handle "Read More / Read Less" functionality
  document.querySelectorAll(".comment").forEach(comment => {
    const textElement = comment.querySelector(".comment-text");
    const fullText = textElement.dataset.fullText;
    const readMoreLink = comment.querySelector(".read-more");

    // Function to toggle text expansion
    function toggleReadMore() {
      if (textElement.classList.contains("expanded")) {
        textElement.textContent = fullText.substring(0, 200) + "...";
        readMoreLink.textContent = "Read more";
        textElement.classList.remove("expanded");
      } else {
        textElement.textContent = fullText;
        readMoreLink.textContent = "Read less";
        textElement.classList.add("expanded");
      }
    }

    // Truncate the text initially
    textElement.textContent = fullText.substring(0, 200) + "...";
    readMoreLink.addEventListener("click", function (e) {
      e.preventDefault();
      toggleReadMore();
    });
  });

  // Handle "Helpful" button toggle
  document.querySelectorAll(".helpful-btn").forEach(button => {
    button.addEventListener("click", function () {
      const countElement = this.querySelector(".helpful-count");
      let count = parseInt(countElement.textContent, 10);
      const isSelected = this.classList.toggle("active");

      if (isSelected) {
        countElement.textContent = count + 1;
      } else {
        countElement.textContent = count - 1;
      }
    });
  });
});



// Dropdown toggle ===========================================================================

document.querySelectorAll('.dropdown-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling; // Selects the dropdown content directly
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', !isExpanded);
    content.hidden = isExpanded;
  });
});




// ACCESSIBILITY TOOLBAR ===========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("accessibility-toggle");
  const settingsRow = document.querySelector(".accessibility-settings");

  // Ensure settings are visible initially
  settingsRow.classList.remove("hidden"); 
  toggleButton.classList.add("open"); 

  toggleButton.addEventListener("click", () => {
    const isOpen = toggleButton.classList.contains("open");

    // Toggle visibility of settings
    settingsRow.classList.toggle("hidden", isOpen);
    toggleButton.setAttribute("aria-expanded", !isOpen);

    // Switch the open class (ensuring correct icon update)
    toggleButton.classList.toggle("open", !isOpen);
  });
});


// PAUSE ANIMATIONS ===========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const pauseButton = document.getElementById("wcag-a-2-2-2"); // Pause Animations button
  const demonstrator = document.querySelector(".acsplorer-demonstrator");
  let animationsPaused = false;

  pauseButton.addEventListener("click", function () {
    animationsPaused = !animationsPaused;
    this.setAttribute("aria-pressed", animationsPaused);

    // Change text and icon based on state
    if (animationsPaused) {
      demonstrator.classList.add("stop-animations");
      window.requestAnimationFrame = () => 0; // Disable animations globally
      this.innerHTML = `<img src="assets/accessibility-ba/img/icons/play_circle-white.svg" alt=""> Play Animations`;
    } else {
      demonstrator.classList.remove("stop-animations");
      window.requestAnimationFrame = window.__proto__.requestAnimationFrame; // Restore animations
      this.innerHTML = `<img src="assets/accessibility-ba/img/icons/pause_circle.svg" alt=""> Pause Animations`;
    }
  });
});



// PAUSE TIMER ===========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.querySelector(".timer"); // Timer element
  const timerButton = document.getElementById("wcag-a-2-2-1"); // Stop Timing button

  let timerRunning = true;
  let remainingTime = 180; // 3:00 minutes in seconds
  let timerInterval;

  // Function to format time as MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `⏳ ${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  // Function to start timer countdown
  function startTimer() {
    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        timerElement.textContent = formatTime(remainingTime);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  // Start the timer initially
  timerElement.textContent = formatTime(remainingTime);
  startTimer();

  // Button click event to stop/start timer
  timerButton.addEventListener("click", function () {
    timerRunning = !timerRunning;
    this.setAttribute("aria-pressed", !timerRunning);

    if (timerRunning) {
      startTimer(); // Resume timer
      this.innerHTML = `<img src="assets/accessibility-ba/img/icons/stop_circle.svg" alt=""> Stop Timing`;
    } else {
      clearInterval(timerInterval); // Pause timer
      this.innerHTML = `<img src="assets/accessibility-ba/img/icons/play_circle-white.svg" alt=""> Continue Timing`;
    }
  });
});


// TEXT SPACING
document.addEventListener("DOMContentLoaded", () => {
  const textSpacingButton = document.getElementById("wcag-aa-1-4-12"); // Actual button
  const demonstrator = document.querySelector(".site-demonstrator");

  if (!textSpacingButton || !demonstrator) {
    console.error("❌ Missing button or .site-demonstrator");
    return;
  }

  textSpacingButton.addEventListener("click", function () {
    demonstrator.classList.toggle("text-spacing-active");

    const isActive = demonstrator.classList.contains("text-spacing-active");

    // Change button text & icon
    this.innerHTML = isActive
      ? `<img src="assets/accessibility-ba/img/icons/text-spacing-minus-white.svg" alt=""> Remove Text Spacing`
      : `<img src="assets/accessibility-ba/img/icons/text-spacing-plus-white.svg" alt=""> Text Spacing`;

    console.log(`✅ Text spacing toggled: ${isActive ? "ON" : "OFF"}`);
  });
});


