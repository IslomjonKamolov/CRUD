const loader = document.querySelector('.loader_window')

window.addEventListener('DOMContentLoaded', () => {
    loader.style.opacity = '0'
    setTimeout(() => {
        loader.style.display = 'none'
    }, 500)
})

const title = document.querySelector('#title')
const cTitle = document.querySelector('#C_title')
const content = document.querySelector('#textarea')
const form = document.querySelector('form')

let dataBase = []

if (localStorage.getItem('info')) {
    dataBase = JSON.parse(localStorage.getItem('info'))
    dataBase.forEach((item) => {
        let titleBox = document.createElement('div')
        titleBox.classList.add('title__box')
        titleBox.innerHTML = `<h3 class="main__title">${item.title}</h3>`
        document.querySelector('.titles__box').appendChild(titleBox)
        console.log('done')
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (title.value.length > 25) {
        alert('Title should not exceed 25 characters')
        return;
    } else {
        dataBase.push({
            title: title.value,
            cTitle: cTitle.value,
            content: content.value,
            id: new Date().getTime(),
        })
    }


    document.querySelector('.titles__box').innerHTML = ''

    dataBase.forEach((item) => {
        let titleBox = document.createElement('div')
        titleBox.classList.add('title__box')
        titleBox.innerHTML = `<h3 class="main__title">${item.title}</h3>`
        document.querySelector('.titles__box').appendChild(titleBox)
        console.log('done')
    })
    localStorage.setItem('info', JSON.stringify(dataBase))
    console.log(dataBase, localStorage.getItem('info'))
    form.reset()
})

if(document.querySelector('.titles__box').innerHTML == ''){
    document.querySelector('.titles__box').innerHTML = `<p class="no__data__text">No data available</p>`
}
