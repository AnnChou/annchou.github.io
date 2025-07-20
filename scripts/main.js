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
const ASSISTIVE_CLASS = 'effect-assistive-mode';

// DARK MODE TOGGLES
const darkBtnTop = document.getElementById('darkModeToggle');
const darkBtnBar = document.getElementById('darkModeToggleIconBar');
const darkIconTop = darkBtnTop?.querySelector('.toggle-icon');
const darkIconBar = darkBtnBar?.querySelector('.toggle-icon');

// ASSISTIVE MODE TOGGLES
const assistBtnTop = document.getElementById('assistiveBtnTop');
const assistBtnBar = document.getElementById('assistiveBtnBar');
const assistIconTop = assistBtnTop?.querySelector('.assistive-icon');
const assistIconBar = assistBtnBar?.querySelector('.assistive-icon');

// 🔁 DARK MODE STATE HANDLER
function applyDarkState(state) {
  const isDark = state === 'enabled';
  document.body.classList.toggle(DARK_CLASS, isDark);
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  const emoji = isDark ? '☀️' : '🌙';
  if (darkIconTop) darkIconTop.textContent = emoji;
  if (darkIconBar) darkIconBar.textContent = emoji;
}

function toggleDarkMode() {
  const current = document.body.classList.contains(DARK_CLASS);
  applyDarkState(current ? 'disabled' : 'enabled');
}

darkBtnTop?.addEventListener('click', toggleDarkMode);
darkBtnBar?.addEventListener('click', toggleDarkMode);

// 🖍️ ASSISTIVE CONTRAST HANDLER
function applyAssistiveState(state) {
  const isAssistive = state === 'enabled';
  document.body.classList.toggle(ASSISTIVE_CLASS, isAssistive);
  localStorage.setItem('effectAssistiveMode', isAssistive ? 'enabled' : 'disabled');
  const emoji = isAssistive ? '🔳' : '🖍️';
  if (assistIconTop) assistIconTop.textContent = emoji;
  if (assistIconBar) assistIconBar.textContent = emoji;
}

function toggleAssistiveMode() {
  const current = document.body.classList.contains(ASSISTIVE_CLASS);
  applyAssistiveState(current ? 'disabled' : 'enabled');
}

assistBtnTop?.addEventListener('click', toggleAssistiveMode);
assistBtnBar?.addEventListener('click', toggleAssistiveMode);

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
