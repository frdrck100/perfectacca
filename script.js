function loadTab(file, btn) {
  // Highlight active tab
  const buttons = document.querySelectorAll('.tab-buttons button');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Load content from the HTML file
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById('tabContent').innerHTML = data;
    })
    .catch(err => {
      document.getElementById('tabContent').innerHTML = "<p>Could not load content.</p>";
      console.error(err);
    });
}

// Scroll to top button functionality
const topButton = document.getElementById('topButton');
if (topButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      topButton.classList.remove('hidden');
    } else {
      topButton.classList.add('hidden');
    }
  });
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Load Previous Tips by default
document.addEventListener("DOMContentLoaded", () => {
  loadTab('yesterday-tips.html', document.querySelector('.tab-buttons button'));
});