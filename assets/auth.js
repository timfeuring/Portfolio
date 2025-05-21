// const accessMap = {
//   coolcompany: 'pass123',
//   amazingagency: 'banana42'
// };

// const timeoutMinutes = 60;

// function getHash() {
//   return window.location.hash.replace('#', '');
// }

// function getQueryParam(param) {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(param);
// }

// function getAccessKey(hash) {
//   return `access_${hash}`;
// }

// function isAccessValid(entry) {
//   if (!entry) return false;
//   try {
//     const data = JSON.parse(entry);
//     return Date.now() - data.timestamp < timeoutMinutes * 60 * 1000;
//   } catch {
//     return false;
//   }
// }

// function requestPassword(hash) {
//   const password = prompt("Please enter the password:");
//   if (password === accessMap[hash]) {
//     localStorage.setItem(getAccessKey(hash), JSON.stringify({
//       granted: true,
//       timestamp: Date.now()
//     }));
//     location.reload();
//   } else {
//     alert("Incorrect password.");
//   }
// }

// function showProjectsForAccess(hash) {
//   const category = getQueryParam('category');
//   const selector = `.project.visible-to-${hash}` + (category ? `[data-category="${category}"]` : '');

//   document.querySelectorAll(`.project.visible-to-${hash}`).forEach(el => {
//     el.style.display = 'block';
//   });

//   // Also show public projects
//   document.querySelectorAll(`.project.visible-to-public`).forEach(el => {
//     el.style.display = 'block';
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const hash = getHash();
//   const key = getAccessKey(hash);
//   const storedAccess = localStorage.getItem(key);

//   if (hash && isAccessValid(storedAccess)) {
//     showProjectsForAccess(hash);
//   } else if (hash && accessMap[hash]) {
//     requestPassword(hash);
//   } else {
//     // No access hash: show only public projects
//     document.querySelectorAll(`.project.visible-to-public`).forEach(el => {
//       el.style.display = 'block';
//     });
//   }
// });

// // Optional logout
// function logoutAccess() {
//   const hash = getHash();
//   localStorage.removeItem(getAccessKey(hash));
//   alert("You have been logged out.");
//   location.reload();
// }
