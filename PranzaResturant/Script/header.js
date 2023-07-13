const login = document.querySelector('.dropdown-nav')
const button = document.querySelector('.times')
// const cancel = document.querySelector('.times')

button.addEventListener('click', () => {
    if (login.classList.contains('active')) {
        login.classList.remove('active');
        button.classList.remove('rotate')

    } else {
        login.classList.add('active');
        button.classList.add('rotate')
    }
});