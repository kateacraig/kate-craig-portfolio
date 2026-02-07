// Kate Craig Portfolio - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // NAVIGATION & HAMBURGER MENU
  // ==========================================
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest("nav") && !e.target.closest(".hamburger")) {
      if (navMenu && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    }
  });

  // ==========================================
  // IMAGE CAROUSEL
  // ==========================================
  const carousel = document.querySelector(".carousel");
  const carouselSlides = document.getElementById("carouselSlides");
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;

  // Only run carousel code if carousel exists on the page
  if (carousel && carouselSlides && slides.length > 0) {
    let currentIndex = 0;
    let slidesToShow = getSlidesToShow();
    let isTransitioning = false;
    let autoAdvanceInterval;

    // Clone slides for infinite loop
    function setupInfiniteLoop() {
      // Clear existing clones if any
      const existingClones = carouselSlides.querySelectorAll(".clone");
      existingClones.forEach((clone) => clone.remove());

      // Clone first set of slides and append to end
      for (let i = 0; i < slidesToShow; i++) {
        const clone = slides[i].cloneNode(true);
        clone.classList.add("clone");
        carouselSlides.appendChild(clone);
      }

      // Clone last set of slides and prepend to beginning
      for (let i = totalSlides - slidesToShow; i < totalSlides; i++) {
        const clone = slides[i].cloneNode(true);
        clone.classList.add("clone");
        carouselSlides.insertBefore(clone, carouselSlides.firstChild);
      }

      // Set initial position (offset by cloned slides at start)
      currentIndex = slidesToShow;
      updateCarouselPosition(false);
    }

    // Determine how many slides to show based on screen width
    function getSlidesToShow() {
      if (window.innerWidth <= 460) {
        return 1;
      } else {
        return 4;
      }
    }

    // Update carousel position
    function updateCarouselPosition(animate = true) {
      const slideWidth = 100 / slidesToShow;
      const offset = -currentIndex * slideWidth;

      if (animate) {
        carouselSlides.style.transition = "transform 1s ease-in-out";
      } else {
        carouselSlides.style.transition = "none";
      }

      carouselSlides.style.transform = `translateX(${offset}%)`;
    }

    // Move to next slide
    function nextSlide() {
      if (isTransitioning) return;

      isTransitioning = true;
      currentIndex++;
      updateCarouselPosition(true);

      // After transition, check if we need to reset
      setTimeout(() => {
        if (currentIndex >= totalSlides + slidesToShow) {
          currentIndex = slidesToShow;
          updateCarouselPosition(false);
        }
        isTransitioning = false;
      }, 1000); // 1 second transition
    }

    // Move to previous slide
    function prevSlide() {
      if (isTransitioning) return;

      isTransitioning = true;
      currentIndex--;
      updateCarouselPosition(true);

      // After transition, check if we need to reset
      setTimeout(() => {
        if (currentIndex < slidesToShow) {
          currentIndex = totalSlides;
          updateCarouselPosition(false);
        }
        isTransitioning = false;
      }, 1000); // 1 second transition
    }

    // Reset auto-advance interval
    function resetAutoAdvance() {
      clearInterval(autoAdvanceInterval);
      autoAdvanceInterval = setInterval(nextSlide, 5000);
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newSlidesToShow = getSlidesToShow();
        if (newSlidesToShow !== slidesToShow) {
          slidesToShow = newSlidesToShow;
          setupInfiniteLoop();
        }
      }, 250);
    });

    // Initialize carousel
    setupInfiniteLoop();

    // Create navigation arrows
    const prevArrow = document.createElement("button");
    prevArrow.className = "carousel-arrow prev";
    prevArrow.innerHTML = "&#8249;"; // Left arrow character
    prevArrow.setAttribute("aria-label", "Previous slide");

    const nextArrow = document.createElement("button");
    nextArrow.className = "carousel-arrow next";
    nextArrow.innerHTML = "&#8250;"; // Right arrow character
    nextArrow.setAttribute("aria-label", "Next slide");

    carousel.appendChild(prevArrow);
    carousel.appendChild(nextArrow);

    // Arrow click handlers
    prevArrow.addEventListener("click", function () {
      prevSlide();
      resetAutoAdvance(); // Reset the 5-second timer when manually advancing
    });

    nextArrow.addEventListener("click", function () {
      nextSlide();
      resetAutoAdvance(); // Reset the 5-second timer when manually advancing
    });

    // Start auto-advance
    autoAdvanceInterval = setInterval(nextSlide, 5000);
  }
});
