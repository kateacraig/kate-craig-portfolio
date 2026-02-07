// Kate Craig Consulting - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // NAVIGATION & HAMBURGER MENU
  // ==========================================
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Mobile dropdown toggle
  if (window.innerWidth <= 760) {
    dropdowns.forEach((dropdown) => {
      const dropdownLink = dropdown.querySelector("a");
      dropdownLink.addEventListener("click", function (e) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });
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
  // SMOOTH SCROLLING
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ==========================================
  // FORM VALIDATION
  // ==========================================
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get all required fields
      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "#ddd";
        }
      });

      if (isValid) {
        alert("Thank you for your submission! We will get back to you soon.");
        form.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  });

  // ==========================================
  // GENERAL ANIMATIONS (All pages)
  // ==========================================
  const generalObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const generalObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        generalObserver.unobserve(entry.target);
      }
    });
  }, generalObserverOptions);

  // Observe elements for animation on all pages
  const animateElements = document.querySelectorAll(
    ".service-card, .testimonial, .grid-item, .portfolio-item"
  );
  animateElements.forEach((element) => {
    generalObserver.observe(element);
  });

  // ==========================================
  // NEWSLETTER SIGNUP PAGE SPECIFIC
  // ==========================================
  const iframe = document.getElementById("newsletter-iframe");

  if (iframe) {
    // Set initial iframe height
    setIframeHeight();

    // Listen for window resize to adjust iframe
    let iframeResizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(iframeResizeTimer);
      iframeResizeTimer = setTimeout(function () {
        setIframeHeight();
      }, 250);
    });

    // Listen for messages from the iframe (if Constant Contact sends them)
    window.addEventListener("message", function (event) {
      // Check if message is from Constant Contact
      if (event.origin.includes("constantcontactpages.com")) {
        // If Constant Contact sends height information
        if (event.data && event.data.height) {
          iframe.style.height = event.data.height + "px";
        }

        // If form is successfully submitted
        if (event.data && event.data.formSubmitted) {
          handleFormSuccess();
        }
      }
    });

    // Add loading indicator
    iframe.addEventListener("load", function () {
      const embedContainer = iframe.closest(".constant-contact-embed");
      if (embedContainer) {
        embedContainer.classList.add("loaded");
      }
    });
  }

  // Smooth scroll to form when clicking benefits (newsletter page only)
  const benefitItems = document.querySelectorAll(".benefit-item");
  if (benefitItems.length > 0) {
    benefitItems.forEach(function (item) {
      item.addEventListener("click", function () {
        const formContainer = document.querySelector(".form-container");
        if (formContainer) {
          formContainer.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Animate benefit items on scroll
    const benefitObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger the animation
          setTimeout(function () {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
          benefitObserver.unobserve(entry.target);
        }
      });
    }, generalObserverOptions); // Reuse the same options

    // Set initial state and observe
    benefitItems.forEach(function (item) {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      benefitObserver.observe(item);
    });
  }

  // ==========================================
  // ACTIVE PAGE STATE
  // ==========================================
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.style.color = "var(--light-blue)";
    }
  });
});

// ==========================================
// GLOBAL FUNCTIONS
// ==========================================

// Function to set iframe height based on viewport (Newsletter page)
function setIframeHeight() {
  const iframe = document.getElementById("newsletter-iframe");
  if (!iframe) return;

  const viewportWidth = window.innerWidth;
  let height;

  // Adjust height based on screen size
  if (viewportWidth <= 460) {
    height = 600; // Mobile
  } else if (viewportWidth <= 760) {
    height = 550; // Tablet
  } else {
    height = 500; // Desktop
  }

  iframe.style.height = height + "px";
}

// Handle successful form submission (Newsletter page)
function handleFormSuccess() {
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #38b6ff, #1d57a4);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            margin: 2rem auto;
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        ">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h2 style="color: white; margin-bottom: 1rem;">Welcome to Our Newsletter!</h2>
            <p style="font-size: 1.1rem; margin: 0;">
                Thank you for subscribing. Check your email to confirm your subscription 
                and start receiving valuable digital marketing insights.
            </p>
        </div>
    `;

  // Insert success message after form
  const formContainer = document.querySelector(".form-container");
  if (formContainer) {
    formContainer.parentNode.insertBefore(
      successMessage,
      formContainer.nextSibling
    );

    // Scroll to success message
    setTimeout(function () {
      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  // Optional: Track form submission with analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "newsletter_signup", {
      event_category: "engagement",
      event_label: "Newsletter Subscription",
    });
  }
}

// ==========================================
// SMART RESIZE HANDLER (FIXED FOR MOBILE)
// ==========================================
// This prevents constant reloading on mobile when scrolling
// Only reloads when window WIDTH changes (orientation or actual resize)
// NOT when height changes (mobile browser UI showing/hiding)

let pageResizeTimer;
let lastWidth = window.innerWidth;

window.addEventListener("resize", function () {
  // Don't do anything on newsletter page (it has its own handler)
  const hasIframe = document.getElementById("newsletter-iframe");
  if (hasIframe) return;

  // Get current width
  const currentWidth = window.innerWidth;

  // Only reload if WIDTH changed (not height)
  // This prevents reload when mobile address bar hides/shows
  if (currentWidth !== lastWidth) {
    clearTimeout(pageResizeTimer);
    pageResizeTimer = setTimeout(function () {
      // Double-check width actually changed before reloading
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        location.reload();
      }
    }, 500); // Increased delay to 500ms for better stability
  }
});

// ==========================================
// SMOOTH SCROLL FIX FOR MOBILE
// ==========================================
// Ensure smooth scrolling works properly on all devices
(function () {
  // Check if device supports smooth scrolling
  if ("scrollBehavior" in document.documentElement.style) {
    return; // Native smooth scroll is supported
  }

  // Polyfill for smooth scroll on older browsers
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      }
    });
  });
})();
