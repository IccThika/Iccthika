document.addEventListener('DOMContentLoaded', () => {
    // ==== LAZY IMAGE LOADING ====
    const lazyImages = document.querySelectorAll("img.lazy-img");
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const realSrc = img.getAttribute('data-src');
            if (realSrc) {
              const tempImg = new Image();
              tempImg.src = realSrc;
              tempImg.onload = () => {
                img.src = realSrc;
                img.classList.add("loaded");
              };
            }
            obs.unobserve(img);
          }
        });
      });
  
      lazyImages.forEach(img => observer.observe(img));
    }
  
    // ==== FULLSCREEN FUNCTIONALITY ====
  
    // Create the fullscreen overlay dynamically (if not already in HTML)
    if (!document.querySelector('.fullscreen-container')) {
      const overlay = document.createElement('div');
      overlay.className = 'fullscreen-container';
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.9); display: none; justify-content: center;
        align-items: center; z-index: 9999;
      `;
  
      const img = document.createElement('img');
      img.className = 'fullscreen-img';
      img.style.cssText = 'max-width: 90%; max-height: 90%; transition: opacity 0.3s ease; opacity: 0;';
  
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-btn';
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        position: absolute; top: 20px; right: 30px; font-size: 40px; color: white;
        background: none; border: none; cursor: pointer;
      `;
  
      overlay.appendChild(img);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
    }
  
    const fullscreenContainer = document.querySelector(".fullscreen-container");
    const fullscreenImg = fullscreenContainer.querySelector(".fullscreen-img");
    const closeBtn = fullscreenContainer.querySelector(".close-btn");
  
    document.querySelectorAll(".fullscreen-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const photo = this.closest(".photo");
        const img = photo.querySelector("img");
        const imgSrc = img.getAttribute("data-src") || img.getAttribute("src");
  
        fullscreenImg.style.opacity = 0;
        fullscreenImg.src = ""; // Clear old image
        fullscreenContainer.style.display = "flex";
  
        setTimeout(() => {
          fullscreenImg.src = imgSrc;
        }, 50); // slight delay
  
        fullscreenImg.onload = () => {
          fullscreenImg.style.opacity = 1;
        };
      });
    });
  
    closeBtn.addEventListener("click", () => {
      fullscreenContainer.style.display = "none";
      fullscreenImg.src = "";
    });
  
    // Close when clicking outside the image
    fullscreenContainer.addEventListener("click", (e) => {
      if (e.target === fullscreenContainer) {
        fullscreenContainer.style.display = "none";
        fullscreenImg.src = "";
      }
    });
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
  document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll(".lazy-img");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const skeleton = img.previousElementSibling;
                img.src = img.dataset.src;

                img.onload = () => {
                    skeleton.style.display = "none";
                    img.style.display = "block";
                };

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: "0px 0px 200px 0px", // preload a bit earlier
        threshold: 0.01
    });

    lazyImages.forEach(img => observer.observe(img));
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
const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let slideIndex = 0;

function updateCarousel() {
  const width = document.querySelector('.carousel-section').clientWidth;
  track.style.transform = `translateX(-${slideIndex * width}px)`;
  
  dots.forEach(dot => dot.classList.remove('active'));
  dots[slideIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => {
  slideIndex++;
  if (slideIndex >= dots.length) slideIndex = 0;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  slideIndex--;
  if (slideIndex < 0) slideIndex = dots.length - 1;
  updateCarousel();
});

dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    slideIndex = idx;
    updateCarousel();
  });
});

const slides = Array.from(track.children);
let currentSlide = 0;
const totalSlides = slides.length;

function moveToNextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  const distance = currentSlide * -100;
  track.style.transform = `translateX(${distance}%)`;
}

// Auto-slide every 3 seconds (3000ms)
setInterval(moveToNextSlide, 3000);
 function scrollNav(amount) {
    const container = document.getElementById("navScroll");
    container.scrollLeft += amount;
  }
  