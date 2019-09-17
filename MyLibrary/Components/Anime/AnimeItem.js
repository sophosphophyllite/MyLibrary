import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FadeIn from '../../Animations/FadeIn'

const TITLE_LINES = 2
const DESCRIPTION_LINES = 6
class AnimeItem extends React.Component {
    _displayFavoriteImage() {
        if (this.props.isAnimeFavorite) {
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../../Images/ic_favorite.png')}
                />
            )
        }
    }
    render() {
        const {anime, displayAnimeDetails} = this.props
        return (
            <FadeIn>
                <TouchableOpacity 
                    style={styles.main_view}
                    onPress={() => displayAnimeDetails(anime.mal_id)}>
                    <Image
                        style={styles.image}
                        source={{uri: anime.image_url}}
                    />
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.title_text} numberOfLines={TITLE_LINES}>
                                {anime.title}
                            </Text>
                            <Text style={styles.vote_text}>
                                {anime.score}
                            </Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={DESCRIPTION_LINES}>{anime.synopsis}</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Number of episodes: {anime.episodes}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    main_view: { 
        height: 200,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 190,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }  
})

export default AnimeItem