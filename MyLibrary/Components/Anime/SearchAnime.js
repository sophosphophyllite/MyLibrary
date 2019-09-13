import React from 'react'
import { View, TextInput, Button } from 'react-native'

class SearchAnime extends React.Component {
    render() {
        return (
            <View>
                <TextInput placeholder="Anime title"/>
                <Button title="Search" onPress={()=>{}}/>
            </View>
        )
    }
}

export default SearchAnime