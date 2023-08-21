async function logout() {
  try {
    // Send a POST request to log the user out
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the homepage after successful logout
      document.location.replace('/');
    } else {
      throw new Error('Failed to log out');
    }
  } catch (error) {
    // Display an alert if there's an error
    alert(error.message || 'An error occurred while logging out');
  }
}

// Attach the event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);