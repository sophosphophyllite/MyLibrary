
export function getAnimeList(anime, limit) {
    const url = 'https://api.jikan.moe/v3/search/anime?q=' + anime
                + '&limit=' + limit
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getAnimeInformationById(id) {
    const url = 'https://api.jikan.moe/v3/anime/' + id

    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}