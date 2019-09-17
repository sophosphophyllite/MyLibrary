import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import AnimeItem from './AnimeItem'
import { connect } from 'react-redux'

class AnimeList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            animeList: []
        }
    }

    _displayAnimeDetails = (idAnime) => {
        this.props.navigation.navigate('AnimeDetail', {idAnime: idAnime})
    }
    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.animeList}
                extraData={this.props.favoritesAnime}
                keyExtractor={(item) => item.mal_id.toString()}
                renderItem={({item}) => (
                    <AnimeItem
                        anime={item}
                        isAnimeFavorite={(this.props.favoritesAnime.findIndex(anime => anime.mal_id === item.mal_id) !== -1) ? true: false}
                        displayAnimeDetails={this._displayAnimeDetails}
                    />
                )}
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    if (!this.props.isFavoriteList && this.props.limit < this.props.maxLimit) {
                        this.props.loadAnimeList()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesAnime: state.favoritesAnime
    }
}

export default connect(mapStateToProps)(AnimeList)