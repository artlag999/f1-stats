// загрузка главной* страницы
export default async function overviewLoad(type) {
    let appHead = document.getElementById('app__head')
    let response = await fetch(`https://v1.formula-1.api-sports.io/${type}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v1.formula-1.api-sports.io",
            "x-apisports-key": "3a9d7670d3ae64a68525281d94a0c79a"
        },
    })
    response = await response.json()
    appHead.textContent = type
    return response;
}
