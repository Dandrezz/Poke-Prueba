import { combineReducers } from 'redux';

import { pokemonReducer } from './pokemonReducer';

export interface rootReducerTypes {
    pokemons: any
}

export const rootReducer = combineReducers<rootReducerTypes>({
    pokemons: pokemonReducer,
})

export type RootState = ReturnType<typeof rootReducer>