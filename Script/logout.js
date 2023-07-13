// logout.js

const logoutButton = document.querySelector('.logout');

logoutButton.addEventListener('click', () => {
  // Perform logout action here
  // For example, clear the token from local storage and redirect to the login page
  localStorage.removeItem('token');
  window.location.href = 'login.html'; // Replace 'login.html' with the actual login page URL
});
