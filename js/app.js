const loader = document.querySelector('.loader_window')

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loader.style.opacity = '0'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500)
    }, 100)
})

const secretInp = document.querySelector('#commandInp')

window.addEventListener('keyup', (e) => {
    if (e.altKey == true && e.shiftKey == true && e.ctrlKey == true && e.keyCode == 83) {
        secretInp.style.display = 'flex'
    }
})

const title = document.querySelector('#title')
const cTitle = document.querySelector('#C_title')
const content = document.querySelector('#textarea')
const form = document.querySelector('.form')
const addBtn = document.querySelector('.draft__add__button')
const texts__box = document.querySelector('.titles__box')
const saved = document.querySelector('.saved')
const draftFace = document.querySelector('.draftFace')
const draftTitle = document.querySelector('.draftTitle')
const draftContent = document.querySelector('.draftContent')
const editButton = document.querySelectorAll('.editButton')
const editTitle = document.querySelector('#editTitle')
const editT = document.querySelector('#E_title')
const editA = document.querySelector('#Etextarea')
const editForm = document.querySelector('.forEdit')

let function_varible = 'add'
let dataBase = []

if (localStorage.getItem('info')) {
    dataBase = JSON.parse(localStorage.getItem('info'))
    updateDOM()
}

addBtn.addEventListener('click', () => {
    if (function_varible === 'add') {
        function_varible = 'close'
        addBtn.src = './icons/exit.svg'
        Object.assign(texts__box.style, {
            opacity: '0',
            transform: 'scale(0)',
        })
        setTimeout(() => {
            Object.assign(form.style, {
                opacity: '1',
                transform: 'scale(1)',
            })
        }, 300)
        setTimeout(() => {
            Object.assign(texts__box.style, {
                display: 'none'
            })
            Object.assign(form.style, {
                display: 'flex',
            })
        }, 200)
    } else {
        function_varible = 'add'
        addBtn.src = './icons/add.svg'
        Object.assign(draftFace.style, {
            opacity: '0',
            transform: 'scale(0)',
        })
        Object.assign(form.style, {
            opacity: '0',
            transform: 'scale(0)',
        })
        setTimeout(() => {
            draftFace.style.display = 'none'
            Object.assign(form.style, {
                display: 'none'
            })
            Object.assign(texts__box.style, {
                display: 'flex'
            })
        }, 200)
        setTimeout(() => {
            Object.assign(texts__box.style, {
                opacity: '1',
                transform: 'scale(1)',
            })
        }, 300)
    }
})

// Funktsiyani yangilash va DOMni qayta tuzish
function updateDOM() {
    texts__box.innerHTML = ''
    dataBase.forEach((item, index) => {
        let titleBox = document.createElement('div')
        titleBox.classList.add('title__box')
        titleBox.innerHTML = `
            <h3 class="main__title">${item.title}</h3>
            <div class="menuBar">
                <img class="editButton" src="./icons/pencil.svg" alt="edit">
                <img class="trashBin" src="./icons/trashBin.svg" alt="trash bin">
            </div> 
        `
        texts__box.appendChild(titleBox)
    })

    addEvent()
    empty()
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (title.value.length > 25) {
        alert('Title should not exceed 25 characters')
        return
    }

    dataBase.push({
        title: title.value,
        cTitle: cTitle.value,
        content: content.value,
        id: new Date().getTime(),
    })

    Object.assign(saved.style, {
        opacity: '0.0',
        display: 'flex',
    })
    setTimeout(() => {
        Object.assign(saved.style, {
            opacity: '0.6',
        })
    }, 100)
    setTimeout(() => {
        Object.assign(saved.style, {
            opacity: '0.0',
        })
        setTimeout(() => {
            saved.style.display = 'none'
        }, 100)
    }, 2000)

    form.reset()
    localStorage.setItem('info', JSON.stringify(dataBase))
    updateDOM()
})

function addEvent() {
    const myDraftListItems = document.querySelectorAll('.title__box')
    const menuBar = document.querySelectorAll('.menuBar')

    myDraftListItems.forEach((draft, index) => {
        draft.addEventListener('click', (e) => {
            if (e.target.className == 'main__title') {
                const selectedItem = dataBase[index]
                draftFace.style.display = 'flex'
                texts__box.style.display = 'none'
                function_varible = 'close'
                addBtn.src = './icons/exit.svg'
                draftTitle.textContent = selectedItem.cTitle
                draftContent.textContent = selectedItem.content
                setTimeout(() => {
                    Object.assign(draftFace.style, {
                        opacity: '1',
                        transform: 'scale(1)',
                    })
                }, 100)
            } else if (e.target.classList.contains('editButton')) {
                editForm.style.display = 'flex'
                texts__box.style.display = 'none'
                let editingItem = dataBase[index]
                editTitle.value = editingItem.title
                editT.value = editingItem.cTitle
                editA.value = editingItem.content

                // `submit` event oldingi hodisalar bilan aralashib ketmasligi uchun uni bir marta qo'shish kerak
                editForm.onsubmit = (e) => {
                    e.preventDefault()

                    // Ma'lumotlarni yangilash
                    editingItem.title = editTitle.value
                    editingItem.cTitle = editT.value
                    editingItem.content = editA.value

                    texts__box.style.display = 'flex'

                    // LocalStorage-ni yangilash
                    localStorage.setItem('info', JSON.stringify(dataBase))

                    // DOMni yangilash
                    updateDOM()

                    // Formani yopish
                    editForm.reset()
                    editForm.style.display = 'none'
                }

                // Bekor qilish tugmasi orqali formani yopish
                editForm.querySelector('button[type=button]').addEventListener('click', () => {
                    editForm.style.display = 'none'
                    texts__box.style.display = 'flex'
                    editForm.reset()
                })
            } else if (e.target.className == 'trashBin') {
                const deletingItem = dataBase[index]
                dataBase = dataBase.filter((db) => db.id != deletingItem.id)
                if (dataBase.length < 1) {
                    empty()
                }
                localStorage.setItem('info', JSON.stringify(dataBase))
                updateDOM()
            }
        })

        draft.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            menuBar.forEach(bar => {
                bar.style.opacity = '0'
            })
            menuBar[index].style.display = 'flex'
            setTimeout(() => {
                menuBar[index].style.opacity = '1'
            }, 100)
        })

        window.addEventListener('click', () => {
            menuBar.forEach(bar => {
                bar.style.display = 'none'
            })
        })
    })
}



function empty() {
    if (texts__box.innerHTML === '') {
        texts__box.innerHTML = `<p class="no__data__text">No data available</p>`
    }
}

empty()

secretInp.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        secretInp.style.display = 'none'
        if (secretInp.value === '/clearStorage') {
            localStorage.clear('info')
            dataBase = []
            texts__box.innerHTML = '<p class="no__data__text">No data available</p>'
        } else if (secretInp.value === '/iamangry') {
            document.body.style.background = 'red'
        } else if (secretInp.value === '/iamnormal') {
            document.body.style.background = '#2a2f44'
        } else if (secretInp.value === '/iamsad') {
            document.body.style.background = 'green'
        }
        secretInp.value = ''
    }
})

document.querySelector('.display__size').textContent = window.innerWidth + 'px'
window.addEventListener('resize', () => {
    document.querySelector('.display__size').textContent = window.innerWidth + 'px'
})
