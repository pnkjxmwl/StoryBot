document.addEventListener('DOMContentLoaded', () => {

    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/story/index.html';
    }
 })

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
        localStorage.setItem('jwtToken', data.data);
        window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/story/index.html';

      } else {
        alert(data.message || 'Signin failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during signin:', error);
      alert('An error occurred during signin. Please try again later.');
    }
  });
  
 