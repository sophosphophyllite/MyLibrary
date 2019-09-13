import React from 'react'
import { View, TextInput, Button } from 'react-native'

class SearchAnime extends React.Component {
    render() {
        return (
            <VIew>
                <TextInput placeholder="Anime title"/>
                <Button title="Search" onPress={()=>{}}/>
            </VIew>
        )
    }
}

export default SearchAnime