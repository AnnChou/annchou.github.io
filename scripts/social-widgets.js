/* ===============================
☕ Ko-fi Floating Chat Integration
-------------------------------
Embeds Ko-fi support button in fixed chat format.
Widget ID: annreflection
=============================== */
/* Check if dark mode is enabled on load for Ko-fi
const kofiColor = localStorage.getItem('darkMode') === 'enabled' ? '#222' : '#f45d22';

kofiWidgetOverlay.draw('annreflection', {
  type: 'floating-chat',
  'floating-chat.donateButton.text': 'Support me',
  'floating-chat.donateButton.background-color': kofiColor, // Dynamic color
  'floating-chat.donateButton.text-color': '#fff'
});
*/
function drawKofi(isDark) {
  // Use a deep grey/black for dark mode, or original orange for light mode
  const kofiColor = isDark ? '#222222' : '#f45d22';
  
  // Clear existing widget if necessary before redrawing
  const existing = document.getElementById('kofi-widget-overlay');
  if (existing) existing.remove();

  kofiWidgetOverlay.draw('annreflection', {
    type: 'floating-chat',
    'floating-chat.donateButton.text': 'Support me',
    'floating-chat.donateButton.background-color': kofiColor,
    'floating-chat.donateButton.text-color': '#fff'
  });
}

// Initial draw based on saved preference
window.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('darkMode') === 'enabled';
  drawKofi(isDark);
});
