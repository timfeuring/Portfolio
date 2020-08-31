// SET ACTIVE PAGE
// ==========================================================================================
const navAbout = document.getElementById('nav-about');
const navWork = document.getElementById('nav-work');

function setActivePage(a, b) {
    a.classList.add('active-page');
    b.classList.remove('active-page');
}



function closeBurgerNav() {
    document.getElementById('main-nav__trigger').checked = false;
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




// SECTION-HIGHLIGHTING

/* // Highlighting der aktuellen Sektion beim Scrollen */
/* ============================================================================ */

// Aufsetzen der Callbackfunktion
let callback3 = function(entries) {
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];

    let id = entry.target.getAttribute("id");
    if (!id) {
      id = entry.target.parentNode.getAttribute("id");
    }

    let newLink = document.querySelector(`[href="#${id}"]`);

    if (entry.intersectionRatio >= 0.5 && entry.isIntersecting) {
      newLink.classList.add("visible");
    } else {
      newLink.classList.remove("visible");
    }

    highlightFirst();
  }
};


// funktion zum highlighten der gerade sichtbaren Sektion
function highlightFirst() {
  
  // Liste der Sichtbaren Sektionen
  let firstVisibleLink = document.querySelector(".visible");

  let links = document.querySelectorAll(".active");

  if (firstVisibleLink) {
    links.forEach(link => {
      link.classList.remove("active");
    });

    firstVisibleLink.classList.add("active");
  }
}

let observer3 = new IntersectionObserver(callback3, {
  threshold: 0.5
});

let items3 = document.querySelectorAll(".section_heading");
items3.forEach(item => {
  observer3.observe(item);
});


if (IntersectionObserver) {
  let observer2 = new IntersectionObserver(callback2, {
    threshold: 0.2
  });
}