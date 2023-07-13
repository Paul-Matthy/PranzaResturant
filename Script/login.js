const seePassword = document.querySelector('.la-eye');
const inputPassword = document.querySelector('.input-password');

seePassword.addEventListener('click', () => {
  seePassword.classList.toggle('not-see');
  if (inputPassword.type === 'password') {
    inputPassword.type = 'text';
  } else {
    inputPassword.type = 'password';
  }
});

const details = document.querySelectorAll('input');
const btn = document.querySelector('.submit');
const message = document.querySelector('.message');

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  message.innerText = '';

  if (!details[0].value || !details[1].value || !details[2].value) {
    message.innerText = 'All fields must be filled';
  } else {
    const user = {
      username: details[0].value,
      email: details[1].value,
      password: details[2].value,
    };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const jsonData = await response.json();
        throw new Error(jsonData.error);
      }

      const jsonData = await response.json(); // Parse the response data only once

      const { id, token } = jsonData;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem('useremail', user.email);
      localStorage.setItem('username', user.username);

      let form = document.querySelector('.card');
      form.reset();

      // alert(jsonData.message);
      // Redirect to home.html or perform any other action on successful login
      window.location.href = 'home.html';
    } catch (error) {
      message.innerText = error.message;
    }
  }
});
