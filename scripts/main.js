/* ======================================================
🗺️ MAIN.JS FUNCTION MAP FOR INTERACTIVE BEHAVIOR
------------------------------------------------------
applyDarkState()         → Enables/disables dark mode, updates both icons
toggleDarkMode()         → Shared click handler for dark mode buttons
applyAssistiveState()    → Enables/disables assistive contrast mode
toggleAssistiveMode()    → Shared click handler for assistive mode buttons
setupAccordion()         → Handles accordion expand/collapse with emoji swap
toggleMobileNav()        → Responsive menu dropdown
DOMContentLoaded         → Restores dark + assistive state, sets up accordion
======================================================= */

/* 🌙 DARK MODE LOGIC */
const DARK_CLASS = 'dark-mode';
const darkBtnTop = document.getElementById('darkModeToggle');
const darkBtnBar = document.getElementById('darkModeToggleIconBar');
const darkIconTop = darkBtnTop?.querySelector('.toggle-icon');
const darkIconBar = darkBtnBar?.querySelector('.toggle-icon');

function applyDarkState(state) {
  const isDark = state === 'enabled';
  document.body.classList.toggle(DARK_CLASS, isDark);
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  
  // Update emojis on all dark mode buttons
  const emoji = isDark ? '☀️' : '🌙';
  [darkBtnTop, darkBtnBar].forEach(btn => {
    if (btn) {
      const icon = btn.querySelector('.toggle-icon') || btn;
      icon.textContent = emoji;
    }
  });
}

function toggleDarkMode() {
  const current = document.body.classList.contains(DARK_CLASS);
  applyDarkState(current ? 'disabled' : 'enabled');
}

// Add listeners to both buttons
darkBtnTop?.addEventListener('click', toggleDarkMode);
darkBtnBar?.addEventListener('click', toggleDarkMode);

/* 🖍️ ASSISTIVE CONTRAST MODE */
const ASSISTIVE_CLASS = 'effect-assistive-mode';
const assistBtnTop = document.getElementById('assistiveBtnTop');
const assistBtnBar = document.getElementById('assistiveBtnBar');
const assistIconTop = assistBtnTop?.querySelector('.assistive-icon');
const assistIconBar = assistBtnBar?.querySelector('.assistive-icon');

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

/* 📂 ACCORDION + EMOJI TOGGLE */
function setupAccordion() {
  document.querySelectorAll('.accordion-toggle').forEach(button => {
    const content = button.nextElementSibling;
    if (!content) return;

    // Reset styles for smooth JS transition, height animation
    content.style.display = "block"; // Required for scrollHeight calculation, Ensure it's not display:none
    content.style.maxHeight = '0px';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.5s ease, padding 0.5s ease';

    // Get the label (e.g., "View more") from data-label attribute or button text
    /* const label = button.getAttribute('data-label') || 'View details';
    button.textContent = `🔻 ${label}`;*/
    const label = button.getAttribute('data-label') || button.textContent.replace(/[🔻🔺]/g, '').trim();

    /* button.addEventListener('click', () => {
      const isOpen = button.classList.toggle('active');
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
      button.textContent = isOpen ? `🔺 ${label}` : `🔻 ${label}`;
      button.setAttribute('aria-expanded', isOpen);
    }); */
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = button.classList.toggle('active');
      
      // Calculate height dynamically
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
      button.textContent = isOpen ? `🔺 ${label}` : `🔻 ${label}`;
      button.setAttribute('aria-expanded', isOpen);
    });
    
  });
}

/* 📱 MOBILE NAVIGATION */
function toggleMobileNav() {
  const nav = document.getElementById("myTopnav");
  if (nav) nav.classList.toggle("responsive");
}

/* 🔁 INITIALIZE ON LOAD */
window.addEventListener('DOMContentLoaded', () => {
  // Init Dark Mode
  const savedDark = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyDarkState(savedDark || (prefersDark ? 'enabled' : 'disabled'));

  /*  const savedAssistive = localStorage.getItem('effectAssistiveMode');
  const assistiveActive = savedAssistive === 'enabled'; 
  applyAssistiveState(assistiveActive ? 'enabled' : 'disabled'); */
  
  // Init Accordion
  setupAccordion();

  // Bind Dark Mode click events
  document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);
  document.getElementById('darkModeToggleIconBar')?.addEventListener('click', toggleDarkMode);
  
  // Bind Mobile Nav
  document.querySelector('.topnav .icon')?.addEventListener('click', toggleMobileNav);
  
});
