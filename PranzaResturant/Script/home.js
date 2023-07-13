const meals = document.querySelectorAll('.meal li')
const foods = document.querySelectorAll('.food')


meals[0].addEventListener('click', () => {
    foods[0].classList.add('appear')
    foods[0].classList.remove('not-appear')
    foods[1].classList.add('not-appear')
    foods[2].classList.add('not-appear')
    foods[3].classList.add('not-appear')

    meals[0].classList.add('highlighted')
    meals[1].classList.remove('highlighted')
    meals[2].classList.remove('highlighted')
    meals[3].classList.remove('highlighted')
})

meals[1].addEventListener('click', () => {
    foods[1].classList.add('appear')
    foods[1].classList.remove('not-appear')
    foods[0].classList.add('not-appear')
    foods[2].classList.add('not-appear')
    foods[3].classList.add('not-appear')

    meals[1].classList.add('highlighted')
    meals[0].classList.remove('highlighted')
    meals[2].classList.remove('highlighted')
    meals[3].classList.remove('highlighted')
})

meals[2].addEventListener('click', () => {
    foods[2].classList.add('appear')
    foods[2].classList.remove('not-appear')
    foods[1].classList.add('not-appear')
    foods[0].classList.add('not-appear')
    foods[3].classList.add('not-appear')

    meals[2].classList.add('highlighted')
    meals[1].classList.remove('highlighted')
    meals[0].classList.remove('highlighted')
    meals[3].classList.remove('highlighted')
})

meals[3].addEventListener('click', () => {
    foods[3].classList.add('appear')
    foods[3].classList.remove('not-appear')
    foods[1].classList.add('not-appear')
    foods[2].classList.add('not-appear')
    foods[0].classList.add('not-appear')

    meals[3].classList.add('highlighted')
    meals[1].classList.remove('highlighted')
    meals[2].classList.remove('highlighted')
    meals[0].classList.remove('highlighted')
})


const details = document.querySelectorAll('input')
const btn = document.querySelector('.submit')
const message = document.querySelector('.msg')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    message.innerText = ''
    
    if (!details[0].value || !details[1].value || !details[2].value || !details[3].value || !details[4].value || !details[5].value) {
        message.innerText = 'All fields must be filled'        
    }
    else {
        let user = {
            username: details[0].value,
            email: details[1].value,
            tel: details[2].value,
            date: details[3].value,
            time: details[4].value,
            number: details[5].value,
        }

        console.log(user)      
    }

    let form = document.querySelector(".card");
    form.reset();
})
