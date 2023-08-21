async function editFormHandler(event) {
  event.preventDefault();

  // Get the values of the title and post_text fields
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  // Extract the post ID from the current URL
  const id = window.location.toString().split('/').pop();

  try {
    // Send a PUT request to update the post by its ID
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, post_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update the post');
    }

    // Redirect to the dashboard after successful update
    document.location.replace('/dashboard');
  } catch (error) {
    // Display an alert if there's an error
    alert(error.message || 'An error occurred while updating the post');
  }
}

// Attach the event listener to the form's submit event
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);