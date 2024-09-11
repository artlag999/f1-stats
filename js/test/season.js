import info from "./info.js"
let currentYear = 0

let page = document.getElementById('app__content')


// меню для выбора информации о сезоне
let menu = document.querySelector(".menu")

// кнопка для вывода личного зачета сезона
let menuDrivers = document.querySelector('[data-menu=drivers]')
// кнопка для вывода командного зачета сезона
let menuTeams = document.querySelector('[data-menu=teams]')
// кнопка для вывода гонок сезона
let menuRaces = document.querySelector('[data-menu=races]')

// запуск загрузки при нажатии на меню
menuDrivers.addEventListener("click", (e) => {
    e.preventDefault()
    rankingsDriversLoad(currentYear)
})
menuTeams.addEventListener("click", (e) => {
    e.preventDefault()
    rankingsTeamsLoad(currentYear)
})
menuRaces.addEventListener("click", (e) => {
    e.preventDefault()
    racesLoad(currentYear)
})

// здесь выводится информация о выбранном пользователем элементе
let modal = document.getElementById("modal")

// класс отключения
let inactive = "inactive"


let appHead = document.getElementById('app__head')









export default function season(seasonArr) {
    page.innerHTML = ''
    let seasonList = document.createElement('ul')
    seasonList.classList.add('app__list')
    page.appendChild(seasonList)

    seasonArr.forEach(season => {
        let seasonItem = document.createElement('li')
        seasonItem.classList.add('app__item')
        seasonItem.textContent = season
        seasonList.appendChild(seasonItem)
        seasonItem.dataset.year = season
        seasonItem.addEventListener('click', () => {
            currentYear = seasonItem.dataset.year
            rankingsDriversLoad(currentYear)
        })
    })
}



// загрузка статистики личного зачета
async function rankingsDriversLoad(year) {
    let response = await fetch(`https://v1.formula-1.api-sports.io/rankings/drivers?season=${year}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-apisports-key": "3a9d7670d3ae64a68525281d94a0c79a"
        }
    })
    response = await response.json()
    appHead.textContent = `${year}: Drivers rankings`

    driversCreate(response.response)
}

// загрузка статистики личного зачета
async function rankingsTeamsLoad(year) {
    let response = await fetch(`https://v1.formula-1.api-sports.io/rankings/teams?season=${year}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-apisports-key": "3a9d7670d3ae64a68525281d94a0c79a"
        }
    })
    response = await response.json()
    appHead.textContent = `${year}: Teams rankings`

    teamsCreate(response.response)
}

// загрузка гонок сезона
async function racesLoad(year) {
    let response = await fetch(`https://v1.formula-1.api-sports.io/races?type=race&season=${year}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-apisports-key": "3a9d7670d3ae64a68525281d94a0c79a"
        }
    })
    response = await response.json()
    appHead.textContent = `${year}: Races`

    racesCreate(response.response)

}

// отрисовка личного зачета
function driversCreate(driversArr) {

    page.innerHTML = ''

    menu.classList.remove(inactive)
    menuDrivers.classList.add('active')
    menuTeams.classList.remove('active')
    menuRaces.classList.remove('active')

    let table = document.createElement("table")
    table.classList.add('table')

    let tableHead = document.createElement("thead")
    tableHead.classList.add('table__head')
    let tr = document.createElement("tr")
    tr.classList.add('table__row')
    let thPosition = document.createElement("th")
    thPosition.classList.add('table__cell', 'table__cell--head')
    let thDriver = document.createElement("th")
    thDriver.classList.add('table__cell', 'table__cell--head')
    let thTeam = document.createElement("th")
    thTeam.classList.add('table__cell', 'table__cell--head')
    let thPoints = document.createElement("th")
    thPoints.classList.add('table__cell', 'table__cell--head')

    thPosition.textContent = "Position"
    thDriver.textContent = "Driver"
    thTeam.textContent = "Team"
    thPoints.textContent = "Points"

    tr.appendChild(thPosition)
    tr.appendChild(thDriver)
    tr.appendChild(thTeam)
    tr.appendChild(thPoints)

    tableHead.appendChild(tr)
    table.appendChild(tableHead)

    let tbody = document.createElement('tbody')
    table.appendChild(tbody)
    driversArr.forEach(driver => {
        let tr = document.createElement("tr")
        tr.classList.add('table__row')

        let thPosition = document.createElement("td")
        thPosition.classList.add('table__cell')

        let thDriver = document.createElement("td")
        thDriver.classList.add('table__cell')
        thDriver.dataset.infotype = 'drivers'
        thDriver.dataset.infoid = driver.driver.id
        thDriver.addEventListener('click', ()=>{
            info(thDriver.dataset.infotype, thDriver.dataset.infoid)
        })



        let thTeam = document.createElement("td")
        thTeam.classList.add('table__cell')
        thTeam.dataset.infotype = 'teams'
        thTeam.dataset.infoid = driver.team.id
        thTeam.addEventListener('click', ()=>{
            info(thTeam.dataset.infotype, thTeam.dataset.infoid)
        })

        let thPoints = document.createElement("td")
        thPoints.classList.add('table__cell')

        thPosition.textContent = driver.position
        thDriver.textContent = driver.driver.name
        thTeam.textContent = driver.team.name
        if (driver.points == null) {
            thPoints.textContent = 0

        } else thPoints.textContent = driver.points

        tr.appendChild(thPosition)
        tr.appendChild(thDriver)
        tr.appendChild(thTeam)
        tr.appendChild(thPoints)

        tbody.appendChild(tr)
    })
    page.appendChild(table)
}

// отрисовка командного зачета
function teamsCreate(teamsArr) {

    page.innerHTML = ''

    menu.classList.remove(inactive)
    menuDrivers.classList.remove('active')
    menuTeams.classList.add('active')
    menuRaces.classList.remove('active')

    let table = document.createElement("table")
    table.classList.add('table')


    let tableHead = document.createElement("thead")
    tableHead.classList.add('table__head')
    let tr = document.createElement("tr")
    tr.classList.add('table__row')
    let thPosition = document.createElement("th")
    thPosition.classList.add('table__cell', 'table__cell--head')
    let thTeam = document.createElement("th")
    thTeam.classList.add('table__cell', 'table__cell--head')
    let thPoints = document.createElement("th")
    thPoints.classList.add('table__cell', 'table__cell--head')

    thPosition.textContent = "Position"
    thTeam.textContent = "Team"
    thPoints.textContent = "Points"

    tr.appendChild(thPosition)
    tr.appendChild(thTeam)
    tr.appendChild(thPoints)

    tableHead.appendChild(tr)
    table.appendChild(tableHead)

    let tbody = document.createElement('tbody')
    table.appendChild(tbody)
    teamsArr.forEach(team => {
        let tr = document.createElement("tr")
        tr.classList.add('table__row')

        let thPosition = document.createElement("td")
        thPosition.classList.add('table__cell')

        let thTeam = document.createElement("td")
        thTeam.classList.add('table__cell')
        thTeam.dataset.infotype = 'teams'
        thTeam.dataset.infoid = team.team.id
        thTeam.addEventListener('click', ()=>{
            info(thTeam.dataset.infotype, thTeam.dataset.infoid)
        })

        let thPoints = document.createElement("td")
        thPoints.classList.add('table__cell')

        thPosition.textContent = team.position
        thTeam.textContent = team.team.name
        if (team.points == null) {
            thPoints.textContent = 0

        } else thPoints.textContent = team.points

        tr.appendChild(thPosition)
        tr.appendChild(thTeam)
        tr.appendChild(thPoints)

        tbody.appendChild(tr)
    })
    page.appendChild(table)
}

// отрисовка гонок сезона
function racesCreate(racesArr) {

    page.innerHTML = ''

    menu.classList.remove(inactive)
    menuDrivers.classList.remove('active')
    menuTeams.classList.remove('active')
    menuRaces.classList.add('active')

    let racesList = document.createElement('ul')
    racesList.classList.add('app__list')
    racesArr.forEach(race => {
        let circuitID = race.circuit.id
        let raceItem = document.createElement('li')
        raceItem.classList.add('app__item')
        raceItem.dataset.infoid = race.id
        raceItem.dataset.infoname = race.competition.name
        raceItem.addEventListener('click', ()=>{
            raceRankings(raceItem.dataset.infoid, raceItem.dataset.infoname, circuitID)
        })

        let raceName = document.createElement('h3')
        raceName.textContent = race.competition.name
        let raceStatus = document.createElement('span')
        raceStatus.textContent = `Status: ${race.status}`
        let raceDate = document.createElement('p')
        raceDate.textContent = race.date
        let raceImg = document.createElement('img')
        raceImg.src = race.circuit.image
        raceImg.classList.add('app__img')


        raceItem.appendChild(raceImg)
        raceItem.appendChild(raceName)
        raceItem.appendChild(raceStatus)
        raceItem.appendChild(raceDate)

        racesList.appendChild(raceItem)
    })
    page.appendChild(racesList)
}




// функция отрисовки результатов гонки
async function raceRankings(raceId, raceName, circuitID){
    let response = await fetch(`https://v1.formula-1.api-sports.io/rankings/races?race=${raceId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-apisports-key": "3a9d7670d3ae64a68525281d94a0c79a"
        }
    })
    response = await response.json()
    appHead.textContent = `${currentYear}: Races: ${raceName}`
    raceStats(response.response, circuitID)

}

function raceStats(raceArr, circuit){
    console.log(raceArr)
    page.innerHTML = ''

    menu.classList.remove(inactive)
    menuDrivers.classList.remove('active')
    menuTeams.classList.remove('active')
    menuRaces.classList.remove('active')


    let table = document.createElement("table")
    table.classList.add('table')

    let tableHead = document.createElement("thead")
    tableHead.classList.add('table__head')
    let tr = document.createElement("tr")
    tr.classList.add('table__row')
    let thPosition = document.createElement("th")
    thPosition.classList.add('table__cell', 'table__cell--head')
    let thDriver = document.createElement("th")
    thDriver.classList.add('table__cell', 'table__cell--head')
    let thTeam = document.createElement("th")
    thTeam.classList.add('table__cell', 'table__cell--head')
    

    thPosition.textContent = "Position"
    thDriver.textContent = "Driver"
    thTeam.textContent = "Team"
    

    tr.appendChild(thPosition)
    tr.appendChild(thDriver)
    tr.appendChild(thTeam)
    

    tableHead.appendChild(tr)
    table.appendChild(tableHead)

    let tbody = document.createElement('tbody')
    table.appendChild(tbody)
    raceArr.forEach(race => {
        let tr = document.createElement("tr")
        tr.classList.add('table__row')

        let thPosition = document.createElement("td")
        thPosition.classList.add('table__cell')

        let thDriver = document.createElement("td")
        thDriver.classList.add('table__cell')
        thDriver.dataset.infotype = 'drivers'
        thDriver.dataset.infoid = race.driver.id
        thDriver.addEventListener('click', ()=>{
            info(thDriver.dataset.infotype, thDriver.dataset.infoid)
        })



        let thTeam = document.createElement("td")
        thTeam.classList.add('table__cell')
        thTeam.dataset.infotype = 'teams'
        thTeam.dataset.infoid = race.team.id
        thTeam.addEventListener('click', ()=>{
            info(thTeam.dataset.infotype, thTeam.dataset.infoid)
        })


        thPosition.textContent = race.position
        thDriver.textContent = race.driver.name
        thTeam.textContent = race.team.name

        tr.appendChild(thPosition)
        tr.appendChild(thDriver)
        tr.appendChild(thTeam)

        tbody.appendChild(tr)
    })
    page.appendChild(table)

    let circuitInfo = document.createElement('span')
    circuitInfo.textContent = ' (?)'
    circuitInfo.dataset.infotype = 'circuits'
    circuitInfo.dataset.infoid = circuit
    appHead.appendChild(circuitInfo)
    circuitInfo.addEventListener('click', ()=>{
        info(circuitInfo.dataset.infotype, circuitInfo.dataset.infoid)
    })
}