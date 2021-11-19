import pokemonApi from "../api/pokemonApi";
import { types } from "../types/types";

export const newPokemon = () => ({
    type: types.nuevo,
})

export const selectPokemon = ( pokemon:any ) => ({
    type: types.seleccionar,
    payload: pokemon
})

export const searchPokemon = ( pattern:string ) => ({
    type: types.search,
    payload: pattern
})

export const requestsPokemons = () => {
    return async(dispatch) => {
        try {
            const { data } = await pokemonApi.get(`/?idAuthor=1`)
            dispatch( loadPokemons( data ) )
        } catch (error) {
            console.log(error)
        }
    }
}

const loadPokemons = ( pokemons:[] ) => ({
    type: types.load,
    payload: pokemons
})