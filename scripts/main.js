/* ======================================================
🗺️ MAIN.JS FUNCTION MAP FOR INTERACTIVE BEHAVIOR
------------------------------------------------------
toggleDarkMode()    → Enables/disables dark mode, saves preference
applyDarkState()    → Helper for theme switching logic
setupAccordion()    → Handles expand/collapse of accordion panels
toggleMobileNav()   → Responsive menu dropdown
======================================================= */

/* 🌙 Dark Mode Toggle with OS Preference & Icon Flip */
const toggleBtn = document.getElementById('darkModeToggle');
const iconSpan = toggleBtn?.querySelector('.toggle-icon');
const DARK_CLASS = 'dark-mode';

function applyDarkState(state) {
  const isDark = state === 'enabled';
  document.body.classList.toggle(DARK_CLASS, isDark);
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  if (iconSpan) iconSpan.textContent = isDark ? '☀️' : '🌙';
}

function toggleDarkMode() {
  const current = document.body.classList.contains(DARK_CLASS);
  applyDarkState(current ? 'disabled' : 'enabled');
}

toggleBtn?.addEventListener('click', toggleDarkMode);

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('darkMode');
  if (saved) {
    applyDarkState(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyDarkState(prefersDark ? 'enabled' : 'disabled');
  }
  setupAccordion();
});

/*  dark toggle button on floating icon bar */
const toggleBtnAlt = document.getElementById('darkModeToggleIconBar');
const iconSpanAlt = toggleBtnAlt?.querySelector('.toggle-icon');

function applyDarkState(state) {
  const isDark = state === 'enabled';
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

  const iconSpan = document.querySelector('#darkModeToggle .toggle-icon');
  if (iconSpan) iconSpan.textContent = isDark ? '☀️' : '🌙';
  if (iconSpanAlt) iconSpanAlt.textContent = isDark ? '☀️' : '🌙';
}

toggleBtnAlt?.addEventListener('click', () => {
  const current = document.body.classList.contains('dark-mode');
  applyDarkState(current ? 'disabled' : 'enabled');
});


/* 📂 Accordion Expand/Collapse with Smooth Height */
function setupAccordion() {
  document.querySelectorAll('.accordion-toggle').forEach(button => {
    const content = button.nextElementSibling;
    if (!content) return;
    content.style.maxHeight = '0px';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.5s ease';

    button.addEventListener('click', () => {
      const isOpen = button.classList.toggle('active');
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
    });
  });
}

/* 📱 Mobile Navigation Toggle */
function toggleMobileNav() {
  const nav = document.getElementById("myTopnav");
  nav.classList.toggle("responsive");
}
