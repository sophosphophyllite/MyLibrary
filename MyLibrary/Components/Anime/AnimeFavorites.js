import React from 'react'
import AnimeList from './AnimeList'
import { connect } from 'react-redux'

class AnimeFavorites extends React.Component {
    
    render() {
        return (
            <AnimeList
                animeList={this.props.favoritesAnime}
                navigation={this.props.navigation}
                isFavoriteList={true}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoritesAnime: state.favoritesAnime
    }
}
export default connect(mapStateToProps)(AnimeFavorites)