import info from "./info.js"

let page = document.getElementById('app__content')


// меню для выбора информации о сезоне
let menu = document.querySelector(".menu")

// здесь выводится информация о выбранном пользователем элементе
let modal = document.getElementById("modal")

// класс отключения
let inactive = "inactive"


let appHead = document.getElementById('app__head')


export default function circuit(circuitArr){
    page.innerHTML = ''
    menu.classList.add(inactive)

    appHead.textContent = 'Circuits'

    let circuitList = document.createElement('ul')
    circuitList.classList.add('app__list')
    page.appendChild(circuitList)

    circuitArr.forEach(circuit => {
        let circuitItem = document.createElement('li')
        circuitItem.classList.add('app__item')
        circuitItem.textContent = circuit.name
        circuitList.appendChild(circuitItem)

        circuitItem.dataset.infoid = circuit.id
        circuitItem.dataset.infotype = 'circuits'
        circuitItem.addEventListener('click', ()=>{
            info(circuitItem.dataset.infotype, circuitItem.dataset.infoid)
        })

        let circuitImg = document.createElement('img')
        circuitImg.src = circuit.image
        circuitImg.classList.add('app__img')
        circuitItem.appendChild(circuitImg)
    })
    
}