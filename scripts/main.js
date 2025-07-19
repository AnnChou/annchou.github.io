/* ======================================================
🗺️ MAIN.JS FUNCTION MAP FOR INTERACTIVE BEHAVIOR
------------------------------------------------------
applyDarkState()          → Enables/disables dark mode, updates both icons
toggleDarkMode()          → Shared click handler for dark mode buttons
applyAssistiveMode()      → Enables/disables high-contrast accessibility
setupAccordion()          → Handles accordion expand/collapse
toggleMobileNav()         → Responsive menu dropdown
DOMContentLoaded listener → Restores dark + assistive state, loads accordions
======================================================= */

/* 🌙 DARK MODE LOGIC */
const DARK_CLASS = 'dark-mode';
const toggleBtnTop = document.getElementById('darkModeToggle');
const toggleBtnBar = document.getElementById('darkModeToggleIconBar');

function applyDarkState(state) {
  const isDark = state === 'enabled';
  document.body.classList.toggle(DARK_CLASS, isDark);
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

  const icon = isDark ? '☀️' : '🌙';
  const iconTop = toggleBtnTop?.querySelector('.toggle-icon');
  const iconBar = toggleBtnBar?.querySelector('.toggle-icon');
  if (iconTop) iconTop.textContent = icon;
  if (iconBar) iconBar.textContent = icon;
}

function toggleDarkMode() {
  const current = document.body.classList.contains(DARK_CLASS);
  applyDarkState(current ? 'disabled' : 'enabled');
}

toggleBtnTop?.addEventListener('click', toggleDarkMode);
toggleBtnBar?.addEventListener('click', toggleDarkMode);

/* 🖍️ HIGH-CONTRAST ASSISTIVE MODE */
const EFFECT_ASSISTIVE_CLASS = 'effect-assistive-mode';
const assistiveToggleBtn = document.getElementById('assistiveToggle');
const assistiveIcon = assistiveToggleBtn?.querySelector('.assistive-icon');

function applyAssistiveMode() {
  const isActive = document.body.classList.toggle(EFFECT_ASSISTIVE_CLASS);
  localStorage.setItem('effectAssistiveMode', isActive ? 'enabled' : 'disabled');
  if (assistiveIcon) assistiveIcon.textContent = isActive ? '🔳' : '🖍️';
}

assistiveToggleBtn?.addEventListener('click', applyAssistiveMode);

/* 📂 ACCORDION TOGGLE */
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

/* 📱 MOBILE NAVIGATION */
function toggleMobileNav() {
  const nav = document.getElementById("myTopnav");
  nav.classList.toggle("responsive");
}

/* 🔁 INITIAL LOAD: Restore preferences + setup UI */
window.addEventListener('DOMContentLoaded', () => {
  const savedDark = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyDarkState(savedDark ?? (prefersDark ? 'enabled' : 'disabled'));

  const savedAssistive = localStorage.getItem('effectAssistiveMode');
  const assistiveActive = savedAssistive === 'enabled';
  document.body.classList.toggle(EFFECT_ASSISTIVE_CLASS, assistiveActive);
  if (assistiveIcon) assistiveIcon.textContent = assistiveActive ? '🔳' : '🖍️';

  setupAccordion();
});
