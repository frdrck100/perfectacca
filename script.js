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

// Theme Toggle Functionality
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeButton('☀️');
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeButton('🌙');
  }
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  if (isDark) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    updateThemeButton('🌙');
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateThemeButton('☀️');
  }
}

function updateThemeButton(icon) {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.textContent = icon;
  }
}

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
  
  // Load Previous Tips by default on football tips page
  const tabButtons = document.querySelector('.tab-buttons button');
  if (tabButtons) {
    loadTab('yesterday-tips.html', tabButtons);
  }

  // Handle feedback form submission
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('feedbackName').value;
      const email = document.getElementById('feedbackEmail').value;
      const message = document.getElementById('feedbackMessage').value;
      
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Submit to Formspree
      fetch('https://formspree.io/f/xrerllkg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      })
      .then(response => {
        if (response.ok) {
          alert('Thank you! Your feedback has been submitted successfully. We appreciate your input!');
          feedbackForm.reset();
        } else {
          alert('Error submitting feedback. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error submitting feedback. Please try again.');
      });
    });
  }
});