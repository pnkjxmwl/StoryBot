 document.addEventListener('DOMContentLoaded', () => {

    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/story/index.html';
    }
 })
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
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      console.log(data);
      if (data.message) {
        alert(data.message); 
        if (data.success) {
          window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/story/signin.html';
        }
      } else {
        alert('Unexpected response from the server. Please try again later.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again later.');
    }
  });
  