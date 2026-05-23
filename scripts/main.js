(function() {
  "use strict";

  // Initialize AOS on page load
  window.addEventListener('load', () => {
    on_page_load();
    callbackFunc(); // Ensure items are checked on initial load
  });

  function on_page_load() {
    // Initialize On-scroll Animations
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 500,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }

  // Hide the loader after the page is fully loaded
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';  // Fade out the loader
      loader.style.transition = 'opacity 0.5s ease';  // Smooth fade-out transition
      setTimeout(() => {
        loader.style.display = 'none';  // Fully remove the loader after fading out
      }, 500);  // 500ms matches the fade-out duration
    }
  });

  const navbar = document.getElementById('header-nav');
  var body = document.getElementsByTagName("body")[0];
  const scrollTop = document.getElementById('scrolltop');

  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm');
      body.style.paddingTop = navbar.offsetHeight + "px";
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm');
      body.style.paddingTop = "0px";
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };

  var elem = document.querySelector('.grid');
  if (elem) {
    imagesLoaded(elem, function() {
      new Masonry(elem, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true
      });
    });
  }

  document.querySelectorAll("[data-bigpicture]").forEach((e) => {
    e.addEventListener("click", (t) => {
      t.preventDefault();
      const data = JSON.parse(e.dataset.bigpicture);
      BigPicture({
        el: t.target,
        ...data
      });
    });
  });

  document.querySelectorAll(".bp-gallery a").forEach((e) => {
    var caption = e.querySelector('figcaption');
    var img = e.querySelector('img');
    img.dataset.caption = '<a class="link-light" target="_blank" href="' + e.href + '">' + caption.innerHTML + '</a>';
    e.addEventListener("click", (t) => {
      t.preventDefault();
      BigPicture({
        el: t.target,
        gallery: '.bp-gallery',
      });
    });
  });

  var items = document.querySelectorAll(".timeline .experience");

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    const threshold = 150; // Adjust this value to control how early the animation triggers

    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
      rect.bottom >= 0 - threshold
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        if (!items[i].classList.contains("in-view")) {
          items[i].classList.add("in-view");
        }
      } else if (items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
      }
    }
  }

  window.addEventListener("scroll", callbackFunc);

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const contactStatus = document.getElementById('contact-status');
    const contactBusiness = document.getElementById('contact-business');
    const contactEmail = document.getElementById('contact-email');
    const contactName = document.getElementById('contact-name');
    const contactSubmit = contactForm.querySelector('.contact-submit');
    const submitLabel = contactSubmit ? contactSubmit.textContent : '';

    const setStatus = (message) => {
      if (contactStatus) {
        contactStatus.textContent = message;
      }
    };

    const setLoadingState = (isLoading) => {
      if (!contactSubmit) {
        return;
      }

      contactSubmit.disabled = isLoading;
      contactSubmit.classList.toggle('is-loading', isLoading);
      contactSubmit.textContent = isLoading ? 'Sending...' : submitLabel;
    };

    const validateBusiness = () => {
      if (!contactBusiness) {
        return true;
      }

      const value = contactBusiness.value.trim();
      if (value.length < 10) {
        contactBusiness.setCustomValidity('Please add at least 10 characters.');
        return false;
      }

      contactBusiness.setCustomValidity('');
      return true;
    };

    if (contactBusiness) {
      contactBusiness.addEventListener('input', validateBusiness);
    }

    if (contactEmail) {
      contactEmail.addEventListener('input', () => {
        contactEmail.setCustomValidity('');
      });
    }

    contactForm.addEventListener('submit', (event) => {
      const businessIsValid = validateBusiness();

      if (!contactForm.checkValidity() || !businessIsValid) {
        event.preventDefault();
        contactForm.reportValidity();

        if (!contactName.value.trim() || !contactEmail.value.trim() || !contactBusiness.value.trim()) {
          setStatus('Fill in all the fields before sending it my way.');
        } else if (!contactEmail.checkValidity()) {
          setStatus('Please use a valid email address.');
        } else if (!businessIsValid) {
          setStatus('The business description needs at least 10 characters.');
        }

        return;
      }

      event.preventDefault();
      setStatus('Submitting your message...');
      setLoadingState(true);

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Submission failed.');
          }

          return response.json().catch(() => ({}));
        })
        .then(() => {
          contactForm.reset();
          if (contactBusiness) {
            contactBusiness.setCustomValidity('');
          }
          if (contactEmail) {
            contactEmail.setCustomValidity('');
          }
          setStatus('Message sent. I’ll get back once the coffee is brewed.');
        })
        .catch(() => {
          setStatus('Something blocked the send. Please try again in a moment.');
        })
        .finally(() => {
          setLoadingState(false);
        });
    });
  }

})();
