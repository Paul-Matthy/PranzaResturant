const item = document.querySelector('.experiment')
const username = document.querySelector('.username')
const title = document.querySelector('.title')
const message = document.querySelector('.message')
const Bot4 = document.querySelector('.post')



Bot4.addEventListener('click', (e) => {
    e.preventDefault()

    const newItem = document.createElement('div');
    newItem.classList.add('ex');


    item.appendChild(newItem)

    let fileInput = document.getElementById('img');


    let img = document.createElement('img')
    newItem.appendChild(img)
    let reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0])
    reader.onload = () => {
        img.setAttribute('src', reader.result)
    }


    const newItem2 = document.createElement('div')
    newItem2.classList.add('tt')
    newItem.appendChild(newItem2)


    const tt2 = document.createElement('p');
    tt2.classList.add('p1')
    tt2.textContent = username.value;
    newItem2.appendChild(tt2)

    const tt3 = document.createElement('p');
    tt3.classList.add('p2')
    tt3.textContent = title.value;
    newItem2.appendChild(tt3)

    const tt4 = document.createElement('p');
    tt4.classList.add('p3')
    tt4.textContent = message.value;
    newItem2.appendChild(tt4)

    let form = document.querySelector(".card");
    form.reset();

    console.log(newItem)
    // localStorage.setItem('info', newItem)
})

let thisPage = 1;
let limit = 6;
let list = document.querySelectorAll('.experiment .ex');

function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.style.display = 'block'
        }
        else {
            item.style.display = 'none'
        }
    })
    listPage();
}
loadItem()

function listPage() {
    let count = Math.ceil(list.length / limit);
    document.querySelector('.list-page').innerHTML = '';

    if (thisPage != 1) {
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.list-page').appendChild(prev)
    }

    for (i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i == thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.list-page').appendChild(newPage);
    }

    if (thisPage != count) {
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.list-page').appendChild(next)
    }
}
function changePage(i) {
    thisPage = i;
    loadItem();
}
