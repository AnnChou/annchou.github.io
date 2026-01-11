/* ===============================
☕ Ko-fi Floating Chat Integration
-------------------------------
Embeds Ko-fi support button in fixed chat format.
Widget ID: annreflection
=============================== */
// Check if dark mode is enabled on load for Ko-fi
const kofiColor = localStorage.getItem('darkMode') === 'enabled' ? '#222' : '#f45d22';

kofiWidgetOverlay.draw('annreflection', {
  type: 'floating-chat',
  'floating-chat.donateButton.text': 'Support me',
  'floating-chat.donateButton.background-color': kofiColor, // Dynamic color
  'floating-chat.donateButton.text-color': '#fff'
});
