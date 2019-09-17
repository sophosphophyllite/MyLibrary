import React from 'react';
import { View, Button, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import AnimeList from './AnimeList'
import { getAnimeList } from '../../API/jikanApi'

const MIN_LENGTH = 3
const MAX_LIMIT = 40
const INCREMENT_LIMIT = 10

class SearchAnime extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.limit = 0
        this.maxLimit = MAX_LIMIT
        this.state = {
            animeList: [],
            isLoading: false
            
        }
        
        this._loadAnimeList = this._loadAnimeList.bind(this)
    }

    _searchChanged(text) {
        this.searchedText = text
    }

    _searchAnime() {
        this.limit = 0
        this.setState({
            animeList: []
        }, () => {
            this._loadAnimeList()
        })
    }

    _loadAnimeList() {
        if (this.searchedText.length >= MIN_LENGTH) {
            this.setState({isLoading: true})
            getAnimeList(this.searchedText, this.limit + INCREMENT_LIMIT)
            .then(data => {
                this.limit = this.limit + INCREMENT_LIMIT
                this.setState({
                    animeList: data.results,
                    isLoading: false
                })
            })
        }
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

    _displayAnimeDetails = (idAnime) => {
        this.props.navigation.navigate("AnimeInformation", { idAnime: idAnime})
    }
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Anime name"
                    onChangeText={(text) => this._searchChanged(text)}
                    onSubmitEditing={() => this._searchAnime()}
                />
                <Button 
                    title="Search" 
                    onPress={() => {this._searchAnime()}}
                />
                <AnimeList
                    animeList={this.state.animeList}
                    navigation={this.props.navigation}
                    loadAnimeList={this._loadAnimeList}
                    limit={this.limit}
                    maxLimit={this.maxLimit}
                    isFavoriteList={false}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default SearchAnime