// document.addEventListener("DOMContentLoaded", function() {
//     const slider = document.getElementById("slider");
//     const imageContainer = document.getElementById("imageContainer");
//     const beforeImage = document.querySelector(".before-image");
    
//     let isDragging = false;

//     slider.addEventListener("mousedown", (e) => {
//         isDragging = true;
//         adjustSlider(e.clientX);
//     });

//     window.addEventListener("mouseup", () => {
//         isDragging = false;
//     });

//     window.addEventListener("mousemove", (e) => {
//         if (isDragging) {
//             adjustSlider(e.clientX);
//         }
//     });

//     function adjustSlider(clientX) {
//         const rect = imageContainer.getBoundingClientRect();
//         const offsetX = clientX - rect.left;
//         const percentage = (offsetX / rect.width) * 100;

//         beforeImage.style.width = percentage + "%";
//         slider.style.left = percentage + "%";
//     }
// });


document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners for hovering over the image containers
    const imageContainers = document.querySelectorAll('.image-container');
    const body = document.body;

    imageContainers.forEach(function (imageContainer) {
        imageContainer.addEventListener('mouseenter', function () {
            // Add the dark-background class to the body
            body.classList.add('dark-background');
        });

        imageContainer.addEventListener('mouseleave', function () {
            // Remove the dark-background class from the body with transition
            body.classList.remove('dark-background');
        });
    });
});



// Overlay for the other IDS
document.addEventListener('DOMContentLoaded', function () {
    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(function (currentImageContainer) {
        const beforeImage = currentImageContainer.querySelector('.before-image');

        currentImageContainer.addEventListener('mouseenter', function () {
            // Add the class to make the ::before element of the hovered element visible
            imageContainers.forEach(function (imageContainer) {
                if (imageContainer !== currentImageContainer) {
                    imageContainer.querySelector('.before-image').classList.add('overlay-visible');
                }
            });
        });

        currentImageContainer.addEventListener('mouseleave', function () {
            // Remove the class when not hovering over the current element
            imageContainers.forEach(function (imageContainer) {
                if (imageContainer !== currentImageContainer) {
                    imageContainer.querySelector('.before-image').classList.remove('overlay-visible');
                }
            });
        });

        // Remove the initial overlay-hidden class to prevent it from being applied on page load
        beforeImage.classList.remove('overlay-visible');
    });
});
