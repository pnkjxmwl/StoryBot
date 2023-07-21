// Handle signin form submission
  document.getElementById('signinForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
  
    try {

      const response = await fetch('http://127.0.0.1:4000/api/v1/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data);
      if (data.success) {
        // Signin success: Store the JWT token in localStorage
        localStorage.setItem('jwtToken', data.data);
       // alert('Signin successful! You are now authenticated.');
        window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/main.html';

      } else {
        // Signin failed: Display the error message from the server
        alert(data.message || 'Signin failed. Please check your credentials and try again.');
      }
    } catch (error) {
      // Handle any network or server-related errors
      console.error('Error during signin:', error);
      alert('An error occurred during signin. Please try again later.');
    }
  });
  
 