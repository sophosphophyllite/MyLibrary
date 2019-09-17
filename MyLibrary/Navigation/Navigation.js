import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import SearchAnime from '../Components/Anime/SearchAnime'
import AnimeInformation from '../Components/Anime/AnimeInformation'
import AnimeFavorites from '../Components/Anime/AnimeFavorites'
import React from 'react'
import { StyleSheet, Image } from 'react-native' 

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: SearchAnime,
        navigationOptions: {
            title: 'Search Anime'
        }
    },
    AnimeDetail: {
        screen: AnimeInformation,
    }
})

const FavoriteStackNavigator = createStackNavigator({
    Favorites: {
        screen: AnimeFavorites,
        navigationOptions: {
            title: 'Favorites'
        }
    },
    AnimeDetail: {
        screen: AnimeInformation
    }
})

const AnimeTabNavigator = createBottomTabNavigator({
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () =>{
                    return <Image
                    source={require('../Images/ic_search.png')}
                    style={styles.icon}
                />
                }
            }
        },
        Favorites: {
            screen: FavoriteStackNavigator,
            navigationOptions: {
                tabBarIcon: () =>{
                    return <Image
                    source={require('../Images/ic_favorite.png')}
                    style={styles.icon}
                />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(AnimeTabNavigator)
