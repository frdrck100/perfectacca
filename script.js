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

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init("ILgtLjY2mQDxHXDIJ");
  }
  
  // Handle feedback form submission
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const statusDiv = document.getElementById('statusMessage');
      
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      statusDiv.innerHTML = '<p style="color: green; font-weight: bold;">✓ Feedback sent successfully!</p>';
      feedbackForm.reset();
      
      // Try to send email with EmailJS (requires proper configuration)
      if (typeof emailjs !== 'undefined') {
        const templateParams = {
          name: name,
          from_email: email,
          message: message,
          to_email: 'breselogan@gmail.com'
        };
        
        emailjs.send('service_4qdvesq', 'template_73gvxy8', templateParams)
          .then(response => {
            console.log('Email sent successfully!', response);
            statusDiv.innerHTML = '<p style="color: green; font-weight: bold;">✓ Email received! Thank you.</p>';
          })
          .catch(err => {
            console.error('EmailJS Error:', err);
            statusDiv.innerHTML = '<p style="color: red; font-weight: bold;">Error sending email. Please try again.</p>';
          });
      } else {
        console.warn('EmailJS library not loaded');
        statusDiv.innerHTML += '<p style="color: red;">EmailJS not loaded. Refresh the page.</p>';
      }
      
      setTimeout(() => {
        statusDiv.innerHTML = '';
      }, 5000);
    });
  }
});