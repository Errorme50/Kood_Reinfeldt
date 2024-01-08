document.addEventListener('DOMContentLoaded', () => {
  const userInfoElement = document.getElementById('user-info');

  // Example: Get user information from the server
  fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      if (user) {
        userInfoElement.textContent = `Logged in as: ${user.username}`;
      } else {
        userInfoElement.textContent = 'Not logged in';
      }
    });

  // Example: Submit feedback form on the contact page
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const feedbackText = document.getElementById('feedback').value;
      if (feedbackText.trim() !== '') {
        // Send feedback to the server (you need to implement this part)
        console.log(`Feedback submitted: ${feedbackText}`);
      }
    });
  }

  // Example: Submit login and signup forms on the login page
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      if (username.trim() !== '' && password.trim() !== '') {
        // Send login data to the server (you need to implement this part)
        console.log(`Login submitted: ${username}`);
      }
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newUsername = document.getElementById('new-username').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (newUsername.trim() !== '' && newPassword.trim() !== '' && confirmPassword.trim() !== '') {
        if (newPassword === confirmPassword) {
          // Send signup data to the server (you need to implement this part)
          console.log(`Signup submitted: ${newUsername}`);
        } else {
          alert("Passwords do not match.");
        }
      }
    });
  }
});
