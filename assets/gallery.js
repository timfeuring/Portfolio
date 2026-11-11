document.addEventListener("DOMContentLoaded", () => {
  const galleryElement = document.getElementById("artwork-gallery");
  if (!galleryElement || typeof lightGallery !== "function" || typeof lgZoom !== "function") return;

  galleryElement.addEventListener("lgInit", () => {
    const outer = document.querySelector(".lg-container .lg-outer");
    if (!outer) return;

    const toolbar = outer.querySelector(".lg-toolbar");
    const previousButton = outer.querySelector(".lg-prev");
    const nextButton = outer.querySelector(".lg-next");
    if (!toolbar || !previousButton || !nextButton) return;

    toolbar.append(previousButton, nextButton);
  });

  lightGallery(galleryElement, {
    plugins: [lgZoom],
    selector: "a.gallery-item",
    licenseKey: "LIG-E3D190BC-AFF5-4C87-A481-AA56BDD2D9B1",
    speed: 1,
    download: false,
    counter: false,
    controls: true,
    enableDrag: true,
    enableSwipe: true,
    keyPress: true,
    loop: false,
    getCaptionFromTitleOrAlt: false,
    appendSubHtmlTo: ".lg-outer",
    allowMediaOverlap: true,
    zoomFromOrigin: false,
    actualSize: false,
    showZoomInOutIcons: false,
    mobileSettings: {
      controls: true,
      showCloseIcon: true,
      download: false,
      showGestureButtons: false,
    },
  });
});