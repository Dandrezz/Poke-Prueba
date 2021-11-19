import { types } from "../types/types";

interface ActionType {
    type: string; 
    payload: any;
}

const initialState = {
    filtro: '',
    pokemonSelecionado: null,
    pokemonsObtenidos: null,
    pokemonNuevo: false,
}

export const pokemonReducer = (state = initialState, action: ActionType ) => {

    switch ( action.type ) {
        case types.seleccionar:
            return {
                ...state,
                pokemonNuevo: false,
                pokemonSelecionado: action.payload
            }

        case types.nuevo:
            return {
                ...state,
                pokemonNuevo: true,
                pokemonSelecionado: null
            }
    
        case types.search:
            return {
                ...state,
                filtro: action.payload,
            }
        case types.load:
            return {
                ...state,
                pokemonsObtenidos: action.payload,
            }
            
        default:
            return state;
    }

}