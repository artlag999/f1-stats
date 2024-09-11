import overviewLoad from './test/overviewLoad.js'

import season from "./test/season.js"
import teams from "./test/team.js"
import circuit from './test/circuit.js'

import info from "./test/info.js"





export default function app() {

    let page = document.getElementById('app__content')

    // меню для выбора информации о сезоне
    let menu = document.querySelector(".menu")

    // кнопка для вывода личного зачета сезона
    let menuDrivers = document.querySelector('[data-menu=drivers]')
    // кнопка для вывода командного зачета сезона
    let menuTeams = document.querySelector('[data-menu=teams]')
    // кнопка для вывода гонок сезона
    let menuRaces = document.querySelector('[data-menu=races]')

    // класс отключения
    let inactive = "inactive"

    let response
    let currentNav


    let navLinkArr = document.querySelectorAll(".nav__link")
    navLinkArr.forEach(navLink => {
        navLink.addEventListener("click", async (e) => {
            e.preventDefault()
            currentNav = navLink.dataset.nav
            response = await overviewLoad(currentNav)
            console.log(navLink.dataset.nav)
            console.log(response)

            menu.classList.add(inactive)
            menuDrivers.classList.remove('active')
            menuTeams.classList.remove('active')
            menuRaces.classList.remove('active')

            if (currentNav == 'seasons') {
                season(response.response)
            }
            else if (currentNav == 'teams') {
                teams(response.response)
            }
            else if (currentNav == 'circuits') {
                circuit(response.response)
            }
        })
    })

    // overviewLoad(currentNav)
}


app()