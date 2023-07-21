document.addEventListener('DOMContentLoaded', () => {
    // Check for the presence of a JWT token in localStorage
    const jwtToken = localStorage.getItem('jwtToken');
    document.getElementById('result').style.display = 'none';
    document.getElementById('loader').style.display='none';
    if (jwtToken) {
      // Token is present, show the welcome page with user info
       const profileLink = document.getElementById('profile-link');
        profileLink.style.display = 'block';
      const loginLink = document.getElementById('login-link');
      loginLink.textContent = 'Logout';
      loginLink.addEventListener('click', () => {
        // Remove the token from localStorage (you may need to perform other logout actions based on your setup)
        localStorage.removeItem('jwtToken');
        // Redirect to the main HTML (replace "main.html" with your desired URL)
        window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/story/index.html';
    });
      showWelcomePage();
      document.getElementById('storyFormContainer').style.display = 'block';

    } else {
      // Token is not present, show the main page with signup and signin buttons
      const profileLink = document.getElementById('profile-link');
        profileLink.style.display = 'none';
      showMainPage();
      document.getElementById('storyFormContainer').style.display = 'none';

    }
  
    // Handle click events for signup and signin buttons
    document.getElementById('signupButton').addEventListener('click', () => {
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/signup.html'; // Redirect to the signup page
    });
  
    document.getElementById('signinButton').addEventListener('click', () => {
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/signin.html'; // Redirect to the signin page
    });
    
    document.getElementById('profileButton').addEventListener('click', () => {
      // Redirect to the userstories.html page
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/userstories.html';
    });
    document.getElementById('communityButton').addEventListener('click', () => {
      // Redirect to the userstories.html page
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/community.html';
    });
  });
  
  function showMainPage() {
    document.getElementById('unauthenticatedContent').style.display = 'block';
    document.getElementById('storyFormContainer').style.display = 'none';
  }
  
  async function showWelcomePage() {
    document.getElementById('unauthenticatedContent').style.display = 'none';
    document.getElementById('storyFormContainer').style.display = 'block';
  
    // For demonstration purposes, assume the user info is available in the following object
    var userInfo = {
      name: 'John Doe',
      email: 'john@example.com',
      // Add any other user information you want to display
    };
    const jwtToken = localStorage.getItem('jwtToken');

    if(jwtToken)
     userInfo= await getuser(jwtToken)
  
     console.log(userInfo);
    // Display the user info on the welcome page
    // document.getElementById('mainContent').innerHTML = `
    // `;
  
    // Handle click event for the logout button
    document.getElementById('logoutButton').addEventListener('click', () => {
      // Clear the JWT token from localStorage to log the user out
      localStorage.removeItem('jwtToken');
  
      // Redirect to the main page (index.html) after logout
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/main.html';
    });
  }
  
  async function getuser(jwtToken){
    const  response = await fetch('http://127.0.0.1:4000/api/v1/isAuthenticated', {
        method: 'GET',
        headers: {
            'x-access-token': jwtToken, // Attach the JWT token as x-access-token in the headers
          }
      });
      const data= await response.json();
    console.log(data);
    return data.data
  }