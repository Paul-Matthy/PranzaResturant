const login = document.querySelector('.login')
const button1 = document.querySelector('.you')
const cancel = document.querySelector('.time')

button1.addEventListener('click', () => {
    login.classList.add('popup')
})

cancel.addEventListener('click', () => {
    login.classList.remove('popup')
})


const lsFirstName = localStorage.getItem('First_name')
const lsLastName = localStorage.getItem('Last_name')
const lsUserName = localStorage.getItem('username')
const lsEmail = localStorage.getItem('useremail')


// const token = localStorage.getItem('token');
// const userId = localStorage.getItem('userId');
// const username = localStorage.getItem('user.username');
// const email = localStorage.getItem('user.email');

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

fetch(`http://localhost:5000/user/${userId}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})


    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user information.');
        }
        return response.json();
    })
    .then(data => {
        const firstNameElement = document.getElementById('firstname');
        firstNameElement.innerText = data.first_name;

        const lastNameElement = document.getElementById('lastname');
        lastNameElement.innerText = data.last_name;

        const usernameElement = document.getElementById('username');
        usernameElement.innerText = data.username;

        const emailElement = document.getElementById('email');
        emailElement.innerText = data.email;
    })
    .catch(error => {
        console.error(error);
        alert('An error occurred while fetching user information.');
    });


