/* =========================================
   1. AUDIO TOGGLE FUNCTIONALITY
   ========================================= */
const video = document.getElementById('myVideo');
const btn = document.getElementById('audioBtn');

// Only run this if the button and video exist to prevent errors
if (btn && video) {
  btn.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      btn.textContent = "Mute Sound";
    } else {
      video.muted = true;
      btn.textContent = "Unmute Sound";
    }
  });
}


/* =========================================
   2. SLIDESHOW AUTO-SCROLL
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.imagess');

  if (slider) {
    let isPaused = false;

    function autoScroll() {
      if (isPaused) return; // Don't scroll if mouse is hovering

      const maxScroll = slider.scrollWidth - slider.clientWidth;

      // If we are at the end (or close to it), go back to start
      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Otherwise, scroll one full slide width to the right
        slider.scrollBy({
          left: slider.clientWidth,
          behavior: 'smooth'
        });
      }
    }

    // Set the timer (3000ms = 3 seconds)
    let scrollInterval = setInterval(autoScroll, 3000);

    // Pause interactions
    slider.addEventListener('mouseenter', () => { isPaused = true; });
    slider.addEventListener('mouseleave', () => { isPaused = false; });
    slider.addEventListener('touchstart', () => { isPaused = true; });
    slider.addEventListener('touchend', () => { isPaused = false; });
  }
});


/* =========================================
   3. SCROLL ANIMATION OBSERVER
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    const observerOptions = {
        root: null,          // Use the viewport
        rootMargin: '0px',   // No margin
        threshold: 0.15      // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS transition
                entry.target.classList.add('show-element');

                // Stop observing once it has animated in (better performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements you want to animate automatically
    const elementsToAnimate = document.querySelectorAll('h1, h2, h3, p, img, video, .btn, .spec, .value-card, .slide-card, .social-links, .link-column, .stat-item, .about-image');

    // Loop through them and apply the starting class
    elementsToAnimate.forEach((el) => {
        // We add the 'hidden-element' class via JS so that if JS fails, 
        // the site is still visible (accessibility safeguard)
        el.classList.add('hidden-element');

        // Start watching the element
        observer.observe(el);
    });
});






/* =========================================
   4. NUMBER COUNTER ANIMATION
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    // Function to perform the counting
    const runCounter = (el) => {
        const target = +el.getAttribute('data-target'); // Get the target number
        const duration = 2000; // Animation duration in milliseconds (2 seconds)
        const increment = target / (duration / 16); // Calculate step size (60fps)
        
        let current = 0;

        const updateCount = () => {
            current += increment;

            if (current < target) {
                // Round up to avoid decimals and keep counting
                el.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                // Ensure it ends exactly on the target
                el.innerText = target;
            }
        };

        updateCount();
    };

    // Observer to trigger the counter only when visible
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                // Stop observing after the animation starts so it only runs once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    // Select all elements with the 'auto-count' class
    const counters = document.querySelectorAll('.auto-count');
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});