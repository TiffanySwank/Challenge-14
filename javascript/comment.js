async function commentFormHandler(event) {
  event.preventDefault();

  // Get the value of the comment input field and trim any leading/trailing whitespace
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  // Get the post_id from the URL
  const post_id = window.location.toString().split('/').pop();

  if (comment_text) {
    try {
      // Send a POST request to create a new comment
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id, comment_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create a new comment');
      }

      // Reload the page to display the new comment
      document.location.reload();
    } catch (error) {
      // Display an alert if there's an error
      alert(error.message || 'An error occurred while creating the comment');
    }
  }
}

// Attach the event listener to the form's submit event
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);