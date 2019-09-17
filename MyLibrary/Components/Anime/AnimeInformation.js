import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet, ScrollView, ActivityIndicator, Image} from 'react-native'
import { getAnimeInformationById } from '../../API/jikanApi'
import { connect } from 'react-redux'

class AnimeInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anime: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        const favoriteAnimeIndex = this.props.favoritesAnime.findIndex(
            item => item.mal_id === this.props.navigation.state.params.idAnime)
        if (favoriteAnimeIndex !== -1) {
            this.setState({
                anime: this.props.favoritesAnime[favoriteAnimeIndex]
            })
            return
        }
        this.setState({isLoading: true})

        getAnimeInformationById(this.props.navigation.state.params.idAnime).then(data => {
            console.log(data)
            this.setState({
                anime: data,
                isLoading: false
            })
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }
    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.anime}
        this.props.dispatch(action)
    }
    _displayFavoriteImage() {
        var sourceImage = require('../../Images/ic_favorite_border.png')
        if (this.props.favoritesAnime.findIndex(item => item.mal_id === this.state.anime.mal_id) !== -1) {
            sourceImage = require('../../Images/ic_favorite.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        )
    }

    _displayAnime() {
        const { anime } = this.state
        if (anime != undefined) {
            return (
                <ScrollView style={styles.scrollView_container}>
                    <Image
                        style={styles.image}
                        source={{uri: anime.image_url}}
                    />
                    <Text style={styles.title_text}>{anime.title}</Text>
                    <TouchableOpacity 
                        style={styles.favorite_container} 
                        onPress={() => this._toggleFavorite()}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>Ranking: {anime.rank}</Text>
                    <Text style={styles.description_text}>Score: {anime.score}</Text>
                    <Text style={styles.description_text}>{anime.synopsis}</Text>
                    <Text style={styles.description_text}>Aired on: {anime.aired.string} </Text>
                    <Text style={styles.description_text}>Opening theme(s): {anime.opening_themes
                        .map(function(val){
                            return val;
                        }).join(" / ")}
                    </Text>
                    <Text style={styles.description_text}>Ending theme(s): {anime.ending_themes
                        .map(function(val){
                            return val;
                        }).join(" / ")}
                    </Text>
                    <Text style={styles.description_text}>Genres: {anime.genres
                        .map(function(val){
                            return val.name;
                        }).join(" / ")}
                    </Text>
                    <Text style={styles.description_text}>{anime.status}</Text>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayAnime()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    favorite_image: {
        width: 40,
        height: 40
    },
    favorite_container: {
        alignItems: 'center'
    },
    image: {
        height: 230,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 25,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    main_container: {
        flex: 1
    },
    scrollView_container: {
        flex: 1
    },
    loading_container: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesAnime: state.favoritesAnime
    }
}

export default connect(mapStateToProps)(AnimeInformation)