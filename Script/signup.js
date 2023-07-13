const seePassword = document.querySelector('.la-eye')
const inputPasswords = document.querySelectorAll('.input-password')

seePassword.addEventListener('click', () => {
  seePassword.classList.toggle("not-see");
  inputPasswords.forEach(inputPassword => {
    if (inputPassword.type == 'password') {
      inputPassword.type = 'text';
    } else {
      inputPassword.type = 'password';
    }
  });
});

const details = document.querySelectorAll('input');
const btn = document.querySelector('.submit');
const message = document.querySelector('.message');

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  message.innerText = '';

  if (!details[0].value || !details[1].value || !details[2].value || !details[3].value || !details[4].value || !details[5].value) {
    message.innerText = 'All fields must be filled';
  } else if (details[4].value !== details[5].value) {
    message.innerText = "Password and Confirm Password don't match";
  } else {
    const user = {
      first_name: details[0].value,
      last_name: details[1].value,
      username: details[2].value,
      email: details[3].value,
      password: details[4].value,
      confirm_password: details[5].value,
    };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const jsonData = await response.json();
        throw new Error(jsonData.error);
      }

      // localStorage.setItem('First_name', user.first_name);
      // localStorage.setItem('Last_name', user.last_name);

      let form = document.querySelector(".card");
      form.reset();

      const jsonData = await response.json();
      alert(jsonData.message);
      // Redirect to home.html or perform any other action on successful login
      window.location.href = 'home.html';
    } catch (error) {
      alert(error.message);
    }
  }
});
