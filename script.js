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

// Load Yesterday's Tips by default
document.addEventListener("DOMContentLoaded", () => {
  loadTab('yesterday-tips.html', document.querySelector('.tab-buttons button'));
});