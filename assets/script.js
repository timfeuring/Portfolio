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



// Add Dynamic Nav Height to main
window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const main = document.querySelector("main");
  const navHeight = nav.offsetHeight;
  main.style.paddingTop = navHeight + "px";
});



// // WORK CATEGORY BG Image Switch

//   document.querySelectorAll('.project-card').forEach(card => {
//     const imageUrls = card.dataset.images.split(',').map(url => url.trim());
//     if (imageUrls.length < 2) return; // kein Wechsel nötig

//     const bg1 = card.querySelector('.bg-image-1');
//     const bg2 = card.querySelector('.bg-image-2');

//     let current = 0;
//     let showingFirst = true;
//     let isTransitioning = false;

//     // Initialbild setzen
//     bg1.style.backgroundImage = `url('${imageUrls[0]}')`;
//     bg1.classList.add('visible');

//     const switchImage = () => {
//       if (isTransitioning) return;
//       isTransitioning = true;

//       const next = (current + 1) % imageUrls.length;
//       const active = showingFirst ? bg1 : bg2;
//       const inactive = showingFirst ? bg2 : bg1;

//       inactive.style.backgroundImage = `url('${imageUrls[next]}')`;

//       // Zuerst einblenden, dann nach Übergangszeit das andere Bild ausblenden
//       inactive.classList.add('visible');
//       setTimeout(() => {
//         active.classList.remove('visible');
//         current = next;
//         showingFirst = !showingFirst;
//         isTransitioning = false;
//       }, 1000); // matcht dem CSS `transition: 1s`
//     };

//     setInterval(switchImage, 5000); // alle 5s
//   });

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






// // CONTACT ILLU AUSTAUSCH
// document.addEventListener('DOMContentLoaded', () => {
//   // Array of image paths
//   const images = [
//       'assets/img/contact/contact-1.svg',
//       'assets/img/contact/contact-2.svg',
//       'assets/img/contact/contact-3.svg',
//       'assets/img/contact/contact-4.svg'
//   ];

//    // Get the image element
//    const imageElement = document.getElementById('rotating-image');
//    let currentIndex = 0;

//    // Function to update the image source with fade effect
//    function updateImage() {
//        // Fade out the current image
//        imageElement.classList.add('fade-out');

//        // Wait for the fade-out animation to complete
//        setTimeout(() => {
//            // Update the image source
//            imageElement.src = images[currentIndex];
//            currentIndex = (currentIndex + 1) % images.length;

//            // Remove fade-out class and add fade-in class
//            imageElement.classList.remove('fade-out');
//            imageElement.classList.add('fade-in');

//            // Remove fade-in class after animation completes
//            imageElement.addEventListener('animationend', () => {
//                imageElement.classList.remove('fade-in');
//            }, { once: true });
//        }, 500); // Match this duration to the CSS animation duration
//    }

//    // Set interval to change the image every 3 seconds (3000 milliseconds)
//    setInterval(updateImage, 3000);
// });