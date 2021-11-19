import axios from 'axios'

const pokemonApi = axios.create({

    baseURL:'https://pokemon-pichincha.herokuapp.com/pokemons'

})

export default pokemonApi