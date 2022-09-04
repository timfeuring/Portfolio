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

