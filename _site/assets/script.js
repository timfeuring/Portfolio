const burgerButton = document.getElementById("burger-button");
const navList = document.getElementById("main-nav__list");

burgerButton.addEventListener("click", () => {
  const isOpen = burgerButton.classList.toggle("open");
  navList.classList.toggle("open");
  burgerButton.setAttribute("aria-expanded", isOpen);
});

function closeBurgerNav() {
  burgerButton.classList.remove("open");
  navList.classList.remove("open");
  burgerButton.setAttribute("aria-expanded", false);
}


document.addEventListener('DOMContentLoaded', () => {
  const indicatorImages = [
    '/assets/img/active-indicators/active-indicator-1.svg',
    '/assets/img/active-indicators/active-indicator-2.svg',
    '/assets/img/active-indicators/active-indicator-3.svg',
    '/assets/img/active-indicators/active-indicator-4.svg',
    '/assets/img/active-indicators/active-indicator-5.svg',
    '/assets/img/active-indicators/active-indicator-6.svg'
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledImages = shuffleArray(indicatorImages);
  const currentPath = window.location.pathname === '/' ? '/index.html' : window.location.pathname;

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const anchor = link.parentElement;
    const href = anchor.getAttribute('href');

    const normalizedHref = (href === '/' || href === 'index.html') 
      ? '/index.html' 
      : href.startsWith('/') 
        ? href 
        : '/' + href;

    if (currentPath === normalizedHref) {
      // First, reset all links
      navLinks.forEach(l => {
        l.classList.remove('active');
        l.style.removeProperty('--active-indicator');
        if (!l.classList.contains('underline')) {
          l.classList.add('underline');
        }
      });

      // Then activate the matching one
      link.classList.add('active');
      link.classList.remove('underline');

      const randomImage = shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
      link.style.setProperty('--active-indicator', `url('${randomImage}')`);
    }
  });
});




// Work Category Filtering
document.addEventListener("DOMContentLoaded", function() {
  const filterButtons = document.querySelectorAll(".work-filter-buttons .button");
  const containers = {
    "digital-design": document.getElementById("container-digital-design"),
    "identity": document.getElementById("container-identity"),
    "handcraft": document.getElementById("container-handcraft")
  };
  const description = document.querySelector(".category-description");
  const instaTeaser = document.querySelector(".instagram-teaser");

  const categoryDescriptions = {
    "digital-design": "A range of digital design projects, including UX/UI design, accessibility, digital illustration and more.",
    "identity": "A selection of branding and identity work, including logo design, visual systems, and brand guidelines.",
    "handcraft": "Handmade and analog work, including calligraphy, sign painting, and illustration."
  };

  const urlParams = new URLSearchParams(window.location.search);
  const initialFilter = urlParams.get("category") || "digital-design";

  function updateFilter(filter) {
    // Update button states
    filterButtons.forEach((btn) => {
      const btnFilter = btn.getAttribute("data-filter");
      btn.classList.toggle("button-primary", btnFilter === filter);
      btn.classList.toggle("button-secondary", btnFilter !== filter);
    });

    // Hide all containers
    Object.values(containers).forEach(container => {
      container.style.display = "none";
    });

    // Show the selected container
    if (containers[filter]) {
      containers[filter].style.display = "flex";
    }

    // Update description
    if (description && categoryDescriptions[filter]) {
      description.textContent = categoryDescriptions[filter];
    }

    // Show or hide Instagram teaser
    if (instaTeaser) {
      instaTeaser.style.display = filter === "handcraft" ? "flex" : "none";
    }

    // Update URL
    history.replaceState(null, "", `?category=${filter}`);
  }

  // Initialize filter
  updateFilter(initialFilter);

  // Add event listeners to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      updateFilter(filter);
    });
  });
});
