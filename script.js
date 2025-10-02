document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.scroll-dot, .nav-scroll'); // Include both classes

  // Function to scroll to a specific section with slow and smooth effect
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }); // Adjusted for smoothness
  };

  // Scroll handler for mouse wheel scrolling
  const scrollHandler = (event) => {
    event.preventDefault(); // Prevent default scrolling behavior

    let delta = event.deltaY;
    let currentIndex = 0;
    let nextIndex = 0;

    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= 0) {
        currentIndex = index;
      }
    });

    if (delta > 0) {
      nextIndex = currentIndex + 1;
      if (nextIndex >= sections.length) {
        nextIndex = sections.length - 1;
      }
    } else {
      nextIndex = currentIndex - 1;
      if (nextIndex < 0) {
        nextIndex = 0;
      }
    }

    const nextSectionId = sections[nextIndex].id;

    scrollToSection(nextSectionId);

    // Activate the corresponding dot
    dots.forEach(dot => dot.classList.remove('active'));
    const activeDot = document.querySelector(`.scroll-dot[data-section="${nextSectionId}"], .nav-scroll[data-section="${nextSectionId}"]`);
    activeDot.classList.add('active');
  };

  // Event listener for mouse wheel scrolling
  document.addEventListener('wheel', scrollHandler, { passive: false });

  // Intersection Observer to highlight dot based on scrolled section
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        dots.forEach(dot => dot.classList.remove('active'));
        const activeDot = document.querySelector(`.scroll-dot[data-section="${sectionId}"], .nav-scroll[data-section="${sectionId}"]`);
        activeDot.classList.add('active');
      }
    });
  }, { threshold: 0.7 });

  // Observe each section
  sections.forEach(section => observer.observe(section));

  // Click event listener for dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const sectionId = dot.getAttribute('data-section');
      scrollToSection(sectionId);

      // Activate the clicked dot
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
});


// Enable Animation through each section when scrolling to it
function scrollTrigger(selector) {
  let els = document.querySelectorAll(selector);
  els = Array.from(els);
  els.forEach(el => {
    addObserver(el);
  });
}

function addObserver(el) {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(el);
}

scrollTrigger('.section');

// *** Mobile Navbar + Hamburger Menu JS Scripting ***
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle menu open/close
  hamburgerMenu.addEventListener('click', () => {
      const isOpen = hamburgerMenu.classList.toggle('open');
      navMenu.classList.toggle('open', isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          hamburgerMenu.classList.remove('open');
          navMenu.classList.remove('open');
      });
  });
});




// ------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links in the hamburger menu
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  // Function to handle smooth scrolling
  function scrollToSection(event) {
      event.preventDefault();
      const sectionId = this.parentElement.getAttribute('data-section');
      const section = document.getElementById(sectionId);
      
      if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Close the menu after navigation (if needed)
      const navMenu = document.getElementById('nav-menu');
      if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
      }
  }

  // Attach click event listeners to all nav links
  navLinks.forEach(link => {
      link.addEventListener('click', scrollToSection);
  });
});
