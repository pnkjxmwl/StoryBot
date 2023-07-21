 // Handle signup form submission
 document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
  
    try {
      const response = await fetch('http://127.0.0.1:4000/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Include the name in the request body
      });
  
      const data = await response.json();
      console.log(data);
      if (data.message) {
        alert(data.message); // Display the success message or error message from the server
        if (data.success) {
          // If signup was successful, redirect to the signin page
          window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/signin.html';
        }
      } else {
        // Handle unexpected response from the server
        alert('Unexpected response from the server. Please try again later.');
      }
    } catch (error) {
      // Handle any network or server-related errors
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again later.');
    }
  });
  