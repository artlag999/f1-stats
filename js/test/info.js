let page = document.getElementById('app__content')


// меню для выбора информации о сезоне
let menu = document.querySelector(".menu")

// здесь выводится информация о выбранном пользователем элементе
let modal = document.getElementById('app__info')

// класс отключения
let inactive = "inactive"


let appHead = document.getElementById('app__head')

export default async function info(type, id) {
    let response = await fetch(`https://v1.formula-1.api-sports.io/${type}?id=${id}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-rapidapi-key": "3a9d7670d3ae64a68525281d94a0c79a"
        }
    })
    response = await response.json()
    createInfo(type, response.response[0])
}


function createInfo(type, info) {
    modal.innerHTML = ''
    // в зависимости от типа идет разная отрисовка информации
    console.log(info)
    console.log(type)


    let infoName = document.createElement('h2')
    infoName.textContent = `Info: ${info.name}`
    console.log(info)
    modal.appendChild(infoName)
    infoName.classList.add('info__head')

    if(info['image']) {
        let img = document.createElement('img')
        img.src = info.image
        modal.appendChild(img)
    } else {
        let img = document.createElement('img')
        img.src = info.logo
        modal.appendChild(img)
    }
 

    // let text = document.createElement('p')
    // text.textContent = JSON.stringify(info)
    // modal.appendChild(text)
}