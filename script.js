document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Mobile Navigation
  // ======================
  const initMobileNavigation = () => {
    const toggler = document.querySelector(".toggler");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-item");
    const body = document.body;

    if (!toggler || !navLinks) return;

    const toggleMenu = () => {
      toggler.classList.toggle("active");
      navLinks.classList.toggle("nav-active");
      body.classList.toggle("no-scroll");
    };

    // Toggle mobile navigation
    toggler.addEventListener("click", toggleMenu);

    // Close mobile menu when clicking on nav items
    navItems.forEach((item) => {
      item.addEventListener("click", function() {
        // Update active state
        navItems.forEach(i => i.classList.remove("nav-item-active"));
        this.classList.add("nav-item-active");
        
        // Close mobile menu on small screens
        if (window.innerWidth <= 768) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && navLinks.classList.contains('nav-active')) {
        toggleMenu();
      }
    });
  };

  // ======================
  // Projects Filtering
  // ======================
  const initProjectsFilter = () => {
    const projectsTabBtns = document.querySelectorAll(".projects-tab-btn");
    const projectsItems = document.querySelectorAll(".projects-item");
    const projectGrid = document.querySelector(".projects-grid");

    if (!projectsTabBtns.length || !projectsItems.length) return;

    const filterProjects = (filter) => {
      projectsItems.forEach((item) => {
        const shouldShow = filter === "all" || item.classList.contains(filter);
        
        if (shouldShow) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });

      // Force reflow for smoother animation
      if (projectGrid) {
        projectGrid.style.display = 'none';
        projectGrid.offsetHeight;
        projectGrid.style.display = 'grid';
      }
    };

    projectsTabBtns.forEach((btn) => {
      btn.addEventListener("click", function() {
        // Update active button
        projectsTabBtns.forEach(btn => 
          btn.classList.remove("projects-tab-btn-active")
        );
        this.classList.add("projects-tab-btn-active");

        filterProjects(this.id);
      });
    });

    // Initialize with 'all' projects shown
    filterProjects('all');
  };

  // ======================
  // Smooth Scrolling
  // ======================
  const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.nav')?.offsetHeight || 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ======================
  // Form Handling
  // ======================
  const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const showMessage = (type, message) => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `form-alert form-alert-${type}`;
      alertDiv.textContent = message;
      
      // Remove any existing alerts
      const existingAlert = contactForm.querySelector('.form-alert');
      if (existingAlert) {
        existingAlert.remove();
      }
      
      contactForm.prepend(alertDiv);
      
      // Remove alert after 5 seconds
      setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => alertDiv.remove(), 300);
      }, 5000);
    };

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual fetch in production)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showMessage('success', 'Thank you for your message! I will get back to you soon.');
        this.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        showMessage('error', 'Something went wrong. Please try again later.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  };

  // ======================
  // Active Section Highlight
  // ======================
  const initActiveSection = () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (!sections.length || !navItems.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(item => {
            item.classList.toggle(
              'nav-item-active',
              item.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-100px 0px -100px 0px'
    });

    sections.forEach(section => observer.observe(section));
  };

  // ======================
  // Initialize All Features
  // ======================
  initMobileNavigation();
  initProjectsFilter();
  initSmoothScrolling();
  initContactForm();
  initActiveSection();

  // Update copyright year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});