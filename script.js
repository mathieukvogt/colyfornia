// Select elements
const aboutIcon = document.querySelector(".about-icon");
const themeIcon = document.querySelector(".theme-icon");
const aboutOverlay = document.querySelector(".about-overlay");
const closeBtn = document.querySelector("#close-btn");

// Create an initial rotation animation for icons when page loads
gsap.fromTo(
  [aboutIcon, themeIcon],
  { rotation: 0 },
  {
    rotation: 360,
    duration: 3,
    ease: "power2.out",
    delay: 0.4, // Small delay after page load
  }
);

// Create overlay backdrop element
const overlayBackdrop = document.createElement("div");
overlayBackdrop.classList.add("overlay-backdrop");
document.body.appendChild(overlayBackdrop);

// Create GSAP timeline for the modal animation
const tl = gsap.timeline({ paused: true, overwrite: "auto" });

// Define the animation
tl.to(overlayBackdrop, {
  duration: 0.4,
  opacity: 1,
  pointerEvents: "auto",
  ease: "power2.out",
}).to(
  aboutOverlay,
  {
    duration: 0.5,
    bottom: "0",
    right: "0",
    ease: "power2.out",
  },
  "-=0.2"
);

// Add event listener to about icon
aboutIcon.addEventListener("click", () => {
  tl.play();
});

// Add event listener to close button
closeBtn.addEventListener("click", () => {
  tl.reverse();
});

// Close the modal when clicking outside of it
document.addEventListener("click", (e) => {
  if (
    !aboutOverlay.contains(e.target) &&
    !isAboutIcon(e.target) &&
    e.target !== overlayBackdrop
  ) {
    if (tl.progress() > 0) {
      tl.reverse();
    }
  }
});

// Helper function to check if click was on about icon
function isAboutIcon(target) {
  return (
    target.classList.contains("about-icon") ||
    target.closest(".icon-container")?.querySelector(".about-icon") != null
  );
}

// Function to set the correct position based on screen width
function updateOverlayPosition() {
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar.offsetHeight;
  const navbarBottom = navbar.getBoundingClientRect().bottom;

  // Calculate the proper top position to maintain space below navbar
  const topPosition = navbarBottom + 30; // Adding 10px buffer

  // Apply the calculated height to ensure it starts below navbar
  aboutOverlay.style.height = `calc(100vh - ${topPosition}px)`;

  // Update the animation if needed
  if (tl.progress() > 0) {
    // If the animation is active, update the end position
    gsap.set(aboutOverlay, { height: `calc(100vh - ${topPosition}px)` });
  }
}

// Call this function on page load
updateOverlayPosition();

// Update when window is resized
window.addEventListener("resize", updateOverlayPosition);

// Also update on orientation change for mobile devices
window.addEventListener("orientationchange", updateOverlayPosition);
