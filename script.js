/* =====================================================================
   NAOUALI & CO, site behavior
   Shared across all pages. Each block guards for missing elements so the
   same file works on the homepage and every subpage.
   ===================================================================== */

/* ===== Year in footer ===== */
document.querySelectorAll("#year, .js-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ===== Navbar: shadow on scroll ===== */
const navbar = document.getElementById("navbar");
if (navbar) {
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll);
  onScroll();
}

/* ===== Mobile menu toggle ===== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ===== Reveal on scroll ===== */
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ===== Hero carousel ===== */
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dots button");
if (heroSlides.length > 1) {
  let current = 0;
  let timer;
  const go = (i) => {
    heroSlides[current].classList.remove("active");
    if (heroDots[current]) heroDots[current].classList.remove("active");
    current = (i + heroSlides.length) % heroSlides.length;
    heroSlides[current].classList.add("active");
    if (heroDots[current]) heroDots[current].classList.add("active");
  };
  const start = () => (timer = setInterval(() => go(current + 1), 5000));
  const reset = () => {
    clearInterval(timer);
    start();
  };
  heroDots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      go(i);
      reset();
    })
  );
  start();
}

/* ===== FAQ accordion ===== */
document.querySelectorAll(".faq-q").forEach((q) => {
  q.addEventListener("click", () => {
    const item = q.closest(".faq-item");
    const answer = item.querySelector(".faq-a");
    const isOpen = item.classList.contains("open");

    // close siblings within the same group
    const group = item.parentElement;
    group.querySelectorAll(".faq-item.open").forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      }
    });

    item.classList.toggle("open", !isOpen);
    answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
  });
});

/* ===== Gallery filtering ===== */
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
if (filterBtns.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      galleryItems.forEach((item) => {
        const show = filter === "all" || item.dataset.cat === filter;
        item.classList.toggle("hide", !show);
      });
    });
  });
}

/* ===== Lightbox ===== */
const lightbox = document.getElementById("lightbox");
if (lightbox && galleryItems.length) {
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  };
  lightboxClose.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ===== Quote / contact form (AJAX submit to Formspree) ===== */
document.querySelectorAll(".js-quote-form").forEach((form) => {
  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector("[type=submit]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (form.action.includes("YOUR_FORM_ID")) {
      status.className = "form-status error";
      status.textContent = "Form not connected yet, see README.md to add your Formspree ID.";
      return;
    }

    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.className = "form-status";
    status.textContent = "";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        status.className = "form-status success";
        status.textContent = "Thanks! A project manager will reach out within 24 hours.";
        form.reset();
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      status.className = "form-status error";
      status.textContent = "Something went wrong. Please call us or try again shortly.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
});

/* ===== Newsletter (front-end only placeholder) ===== */
document.querySelectorAll(".js-newsletter").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = form.parentElement.querySelector(".footer-note");
    if (note) note.textContent = "Thanks for subscribing!";
    form.reset();
  });
});
