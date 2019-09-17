const initialState = { favoritesAnime: []}

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case "TOGGLE_FAVORITE" :
            const favoriteAnimeIndex = state.favoritesAnime.findIndex(item => item.mal_id === action.value.mal_id)
            if (favoriteAnimeIndex !== -1) {
                nextState = {
                    ...state,
                    favoritesAnime: state.favoritesAnime.filter((item, index) => index !== favoriteAnimeIndex)
                }
            }
            else {
                nextState = {
                    ...state,
                    favoritesAnime: [...state.favoritesAnime, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite