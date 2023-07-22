document.addEventListener('DOMContentLoaded', () => {
    const jwtToken = localStorage.getItem('jwtToken');
    document.getElementById('result').style.display = 'none';
    document.getElementById('loader').style.display='none';
    if (jwtToken) {
       const profileLink = document.getElementById('profile-link');
        profileLink.style.display = 'block';
      const loginLink = document.getElementById('login-link');
      loginLink.textContent = 'Logout';
      loginLink.addEventListener('click', () => {
        localStorage.removeItem('jwtToken');
        window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/story/index.html';
    });
      showWelcomePage();
      document.getElementById('storyFormContainer').style.display = 'block';

    } else {
      const profileLink = document.getElementById('profile-link');
        profileLink.style.display = 'none';
      showMainPage();
      document.getElementById('storyFormContainer').style.display = 'none';

    }
  
    document.getElementById('signupButton').addEventListener('click', () => {
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/signup.html'; // Redirect to the signup page
    });
  
    document.getElementById('signinButton').addEventListener('click', () => {
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/signin.html'; // Redirect to the signin page
    });
    
    document.getElementById('profileButton').addEventListener('click', () => {
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/userstories.html';
    });
    document.getElementById('communityButton').addEventListener('click', () => {
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
  
    var userInfo = {
      name: 'John Doe',
      email: 'john@example.com',
    };
    const jwtToken = localStorage.getItem('jwtToken');

    if(jwtToken)
     userInfo= await getuser(jwtToken)
  
     console.log(userInfo);

  
    document.getElementById('logoutButton').addEventListener('click', () => {
      localStorage.removeItem('jwtToken');
  
      window.location.href = 'file:///D:/PROGRAM/Projects/StoryBot/Frontend/main.html';
    });
  }
  
  async function getuser(jwtToken){
    const  response = await fetch('http://127.0.0.1:4000/api/v1/isAuthenticated', {
        method: 'GET',
        headers: {
            'x-access-token': jwtToken, 
          }
      });
      const data= await response.json();
    console.log(data);
    return data.data
  }