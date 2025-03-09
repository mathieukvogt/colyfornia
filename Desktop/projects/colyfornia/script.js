// Select elements
const aboutIcon = document.querySelector(".about-icon");
const aboutOverlay = document.querySelector(".about-overlay");
const closeBtn = document.querySelector("#close-btn");

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
  // No need to update top position as we're coming from bottom now
  // But we could adjust other properties if needed based on screen size
}

// Call this function on page load
updateOverlayPosition();

// Update when window is resized
window.addEventListener("resize", updateOverlayPosition);
