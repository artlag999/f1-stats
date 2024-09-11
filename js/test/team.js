import info from "./info.js"

let page = document.getElementById('app__content')


// меню для выбора информации о сезоне
let menu = document.querySelector(".menu")

// здесь выводится информация о выбранном пользователем элементе
let modal = document.getElementById("modal")

// класс отключения
let inactive = "inactive"


let appHead = document.getElementById('app__head')








export default function teams(teamsArr){
    page.innerHTML = ''
    menu.classList.add(inactive)

    appHead.textContent = 'Teams'

    let teamsList = document.createElement('ul')
    teamsList.classList.add('app__list')
    page.appendChild(teamsList)

    teamsArr.forEach(team => {
        let teamsItem = document.createElement('li')
        teamsItem.classList.add('app__item')
        teamsItem.textContent = team.name
        teamsList.appendChild(teamsItem)


        teamsItem.dataset.infotype = 'teams'
        teamsItem.dataset.infoid = team.id
        teamsItem.addEventListener('click', ()=>{
            info(teamsItem.dataset.infotype, teamsItem.dataset.infoid)
        })

        let teamsImg = document.createElement('img')
        teamsImg.src = team.logo
        teamsImg.classList.add('app__img')
        teamsItem.appendChild(teamsImg)
    })
}