const details = document.querySelectorAll('input')
const detail = document.querySelectorAll('textarea')
const btn = document.querySelector('.submit')
const message = document.querySelector('.msg')

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    message.innerText = ''

    if (!details[0].value || !details[1].value || !details[2].value || !detail[0].value) {
        message.innerText = 'All fields must be filled'

    }
    else {
        let user = {
            username: details[0].value,
            email: details[1].value,
            subject: details[2].value,
            message: detail[0].value,
        }

        // console.log(user)

        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send email.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.message); // Show success message or perform further actions

                let form = document.querySelector(".card");
                form.reset();
            })

            .catch(error => {
                console.error('Error sending email:', error);
                // Show error message or handle the error
            });

    }

    // let form = document.querySelector(".card");
    // form.reset();


})