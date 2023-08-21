async function newFormHandler(event) {
  event.preventDefault();

  // Get the values of the title and post_text fields
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  try {
    // Send a POST request to create a new post
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, post_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create a new post');
    }

    // Redirect to the dashboard if the request is successful
    document.location.replace('/dashboard');
  } catch (error) {
    // Display an alert if there's an error
    alert(error.message || 'An error occurred while creating the post');
  }
}

// Attach the event listener to the form's submit event
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);