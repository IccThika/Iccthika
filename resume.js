// Get all the fullscreen buttons
const fullscreenButtons = document.querySelectorAll('.fullscreen-btn');

// Get the fullscreen overlay and elements
const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenImg = document.getElementById('fullscreenImg');
const closeBtn = document.getElementById('closeBtn');

// Ensure the overlay remains hidden on page load
document.addEventListener('DOMContentLoaded', () => {
    fullscreenOverlay.style.visibility = 'hidden'; // Keep overlay invisible initially
    fullscreenOverlay.style.opacity = '0'; // Make sure overlay is fully transparent
});

// Add event listener to each fullscreen button
fullscreenButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Get the image associated with the clicked button
        const img = this.closest('.photo').querySelector('img');
        
        // Set the image source to the clicked image and show the overlay
        fullscreenImg.src = img.src;
        fullscreenOverlay.style.visibility = 'visible'; // Make overlay visible
        fullscreenOverlay.style.opacity = '1'; // Fade in the overlay
    });
});

// Close the fullscreen overlay when the close button is clicked
closeBtn.addEventListener('click', function () {
    fullscreenOverlay.style.visibility = 'hidden'; // Hide the overlay
    fullscreenOverlay.style.opacity = '0'; // Fade out the overlay
});

// Close the fullscreen overlay when clicking outside the image
fullscreenOverlay.addEventListener('click', function (e) {
    if (e.target === fullscreenOverlay) {
        fullscreenOverlay.style.visibility = 'hidden'; // Hide the overlay if clicked outside the image
        fullscreenOverlay.style.opacity = '0'; // Fade out the overlay
    }
});
function downloadImage(url) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img.lazy-img");

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const realSrc = img.getAttribute('data-src');
          const tempImg = new Image();
          tempImg.src = realSrc;

          tempImg.onload = () => {
            img.src = realSrc;
            img.classList.add("loaded");
          };

          obs.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  });
  document.querySelectorAll(".fullscreen-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const photo = this.closest(".photo");
      const img = photo.querySelector("img");
      const imgSrc = img.getAttribute("data-src") || img.getAttribute("src");
  
      const fullscreenContainer = document.querySelector(".fullscreen-container");
      const fullscreenImg = fullscreenContainer.querySelector(".fullscreen-img");
  
      fullscreenImg.style.opacity = 0;
      fullscreenImg.src = ""; // Clear old image before setting new
      fullscreenContainer.style.display = "flex";
  
      setTimeout(() => {
        fullscreenImg.src = imgSrc;
      }, 50); // short delay to ensure the image resets
  
      fullscreenImg.onload = () => {
        fullscreenImg.style.opacity = 1;
      };
    });
  });
  
  document.querySelector(".close-btn").addEventListener("click", () => {
    const fullscreenContainer = document.querySelector(".fullscreen-container");
    const fullscreenImg = fullscreenContainer.querySelector(".fullscreen-img");
    fullscreenContainer.style.display = "none";
    fullscreenImg.src = "";
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop(); // e.g., "kids.html"
    const navLinks = document.querySelectorAll(".nav2 a");

    navLinks.forEach(link => {
      const linkPage = link.getAttribute("href");

      // Highlight link if it matches current page
      if (linkPage === currentPage) {
        link.classList.add("active");
      }

      // Optional: still respond to clicks (if using AJAX-style nav, for example)
      link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  });
  window.addEventListener("load", () => {
    document.querySelector('.nav2-skeleton').style.display = 'none';
    document.querySelector('.nav2').style.display = 'flex';
});
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector(".loader");
    const progress = document.querySelector(".loader .progress");

    document.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", function (e) {
            const url = link.getAttribute("href");

            // Skip if link is a hash or JavaScript link
            if (!url || url.startsWith("#") || url.startsWith("javascript:")) return;

            e.preventDefault();

            // Show loader
            loader.style.display = "flex";
            progress.style.width = "0%";

            // Animate progress
            setTimeout(() => {
                progress.style.width = "100%";
            }, 10);

            // Wait for animation, then navigate
            setTimeout(() => {
                window.location.href = url;
            }, 600); // slightly longer than CSS transition
        });
    });
});
const slides = document.getElementById('slides');
const totalSlides = document.querySelectorAll('.slide').length;
let index = 0;

setInterval(() => {
  index = (index + 1) % totalSlides;
  slides.style.transform = `translateX(-${index * 100}%)`;
}, 5000); // 5 seconds
