async function deleteFormHandler(event) {
  event.preventDefault();

  // Extract the post ID from the current URL
  const id = window.location.toString().split('/').pop();

  try {
    // Send a DELETE request to delete the post by its ID
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the post');
    }

    // Redirect to the dashboard after successful deletion
    document.location.replace('/dashboard');
  } catch (error) {
    // Display an alert if there's an error
    alert(error.message || 'An error occurred while deleting the post');
  }
}

// Attach the event listener to the delete button's click event
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);