async function signupFormHandler(event) {
  event.preventDefault();

  // Get the values of the username and password fields
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try {
      // Send a POST request to create a new user
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to create a new user');
      }

      // Display a success message and reload the page
      alert('New user created. You can now log in.');
      document.location.reload();
    } catch (error) {
      // Display an alert if there's an error
      alert(error.message || 'An error occurred while creating the user');
    }
  }
}

async function loginFormHandler(event) {
  event.preventDefault();

  // Get the values of the username and password fields
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      // Send a POST request to log in the user
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to the dashboard after successful login
        document.location.replace('/dashboard');
      } else {
        throw new Error('Failed to log in');
      }
    } catch (error) {
      // Display an alert if there's an error
      alert(error.message || 'An error occurred while logging in');
    }
  }
}

// Attach event listeners to the signup and login forms
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);