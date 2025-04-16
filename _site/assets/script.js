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




var i = 0;
var txt =  ", I'm Tim. "
var speed = 100;

setTimeout(function typeWriter() {
  if (i < txt.length) {
    document.getElementById("about-headline").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}, 1000)


// Add Dynamic Nav Height to main
window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const main = document.querySelector("main");
  const navHeight = nav.offsetHeight;
  main.style.paddingTop = navHeight + "px";
});



// WORK CATEGORY BG Image Switch

  document.querySelectorAll('.project-card').forEach(card => {
    const imageUrls = card.dataset.images.split(',').map(url => url.trim());
    if (imageUrls.length < 2) return; // kein Wechsel nötig

    const bg1 = card.querySelector('.bg-image-1');
    const bg2 = card.querySelector('.bg-image-2');

    let current = 0;
    let showingFirst = true;
    let isTransitioning = false;

    // Initialbild setzen
    bg1.style.backgroundImage = `url('${imageUrls[0]}')`;
    bg1.classList.add('visible');

    const switchImage = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      const next = (current + 1) % imageUrls.length;
      const active = showingFirst ? bg1 : bg2;
      const inactive = showingFirst ? bg2 : bg1;

      inactive.style.backgroundImage = `url('${imageUrls[next]}')`;

      // Zuerst einblenden, dann nach Übergangszeit das andere Bild ausblenden
      inactive.classList.add('visible');
      setTimeout(() => {
        active.classList.remove('visible');
        current = next;
        showingFirst = !showingFirst;
        isTransitioning = false;
      }, 1000); // matcht dem CSS `transition: 1s`
    };

    setInterval(switchImage, 5000); // alle 5s
  });




// // WORK PROJECT FILTER
// document.addEventListener("DOMContentLoaded", function () {
//   const filterButtons = document.querySelectorAll(".work-filter-buttons .button");
//   const projects = document.querySelectorAll(".project-teaser");
//   const description = document.querySelector(".category-description");

//   const categoryDescriptions = {
//     "digital-design": "A range of digital design projects, including UX/UI design, prototypes, accessibility, digital illustration and more.",
//     "identity": "A selection of branding and identity work, including logo design, visual systems, and brand guidelines.",
//     "handcraft": "Handmade and analog work, including calligraphy, sign painting, and illustration."
//   };

//   filterButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const filter = button.getAttribute("data-filter");

//       filterButtons.forEach((btn) => btn.classList.remove("active"));
//       button.classList.add("active");

//       projects.forEach((project) => {
//         const category = project.getAttribute("data-category");

//         if (filter === "all" || category === filter) {
//           project.style.display = "block";
//         } else {
//           project.style.display = "none";
//         }
//       });

//       // Optional: update the category description text
//       if (description && categoryDescriptions[filter]) {
//         description.textContent = categoryDescriptions[filter];
//       }
//     });
//   });
// });
